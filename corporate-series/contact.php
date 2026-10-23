<?php
/**
 * Form handler for the Corporate Table Soccer Series page.
 *
 * - Checks the fields again on the server.
 * - Saves each registration to data/registrations.csv (web access is blocked
 *   by data/.htaccess).
 * - Sends the registration by email to the federation, if RECIPIENT_EMAIL is set.
 * - Answers with JSON for the JavaScript form, or with a small HTML page when
 *   JavaScript is off.
 *
 * Works with PHP 7.2 or newer.
 */

declare(strict_types=1);

/* ---------- Settings: edit these before the page goes live ---------- */

// The address that receives the registrations, e.g. 'office@frfm.ro'.
// Leave empty to only save to the CSV file.
const RECIPIENT_EMAIL = '';

// The "From" address of the email. Use an address on the frfm.ro domain,
// e.g. 'no-reply@frfm.ro', or the email can land in spam.
const SENDER_EMAIL = '';

const EMAIL_SUBJECT = 'Corporate Table Soccer Series – new registration';

const DATA_FILE = __DIR__ . '/data/registrations.csv';

/* --------------------------------------------------------------------- */

const PARTICIPATION_OPTIONS = [
	'company'    => 'Company (one or more company teams)',
	'team'       => 'Team or department (teambuilding)',
	'colleagues' => 'Group of colleagues (play regularly)',
];

const PLAYER_OPTIONS = [
	'2-4'    => '2–4 players',
	'5-10'   => '5–10 players',
	'11-20'  => '11–20 players',
	'20+'    => 'More than 20 players',
	'unsure' => 'Not sure yet',
];

$wantsJson = strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
	header('Location: ./', true, 303);
	exit;
}

// Spam trap: people do not see the "website" field, so a value means a bot.
// Answer "ok" so the bot does not try again.
if (post_text('website', 200) !== '') {
	respond(200, ['ok' => true], $wantsJson);
}

$data = [
	'company'       => one_line(post_text('company', 150)),
	'name'          => one_line(post_text('name', 120)),
	'role'          => one_line(post_text('role', 120)),
	'email'         => one_line(post_text('email', 254)),
	'phone'         => one_line(post_text('phone', 40)),
	'city'          => one_line(post_text('city', 80)),
	'participation' => post_text('participation', 20),
	'players'       => post_text('players', 20),
	'message'       => post_text('message', 2000),
	'updates'       => post_text('updates', 1) === '1' ? 'yes' : 'no',
	'consent'       => post_text('consent', 1) === '1',
];

$errors = [];

if ($data['company'] === '') {
	$errors['company'] = 'Please enter the name of your company.';
}
if ($data['name'] === '') {
	$errors['name'] = 'Please enter your name.';
}
if (filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
	$errors['email'] = 'Please enter a valid email address.';
}
if ($data['phone'] !== '' && !preg_match('~^[0-9 +().\-/]{6,40}$~', $data['phone'])) {
	$errors['phone'] = 'Please enter a valid phone number, or leave this field empty.';
}
if (!array_key_exists($data['participation'], PARTICIPATION_OPTIONS)) {
	$errors['participation'] = 'Please select the option that describes you best.';
}
if (!array_key_exists($data['players'], PLAYER_OPTIONS)) {
	$errors['players'] = 'Please select an estimate.';
}
if (!$data['consent']) {
	$errors['consent'] = 'Please agree, so that we can contact you.';
}

if ($errors) {
	respond(422, ['ok' => false, 'errors' => $errors], $wantsJson);
}

$row = [
	'received_at'   => date('c'),
	'company'       => $data['company'],
	'contact_name'  => $data['name'],
	'role'          => $data['role'],
	'email'         => $data['email'],
	'phone'         => $data['phone'],
	'city'          => $data['city'],
	'participation' => PARTICIPATION_OPTIONS[$data['participation']],
	'players'       => PLAYER_OPTIONS[$data['players']],
	'future_events' => $data['updates'],
	'message'       => $data['message'],
];

$saved  = save_row(DATA_FILE, $row);
$mailed = send_mail($row);

if (!$saved && !$mailed) {
	error_log('Corporate series form: could not save or email a registration.');
	respond(500, [
		'ok'      => false,
		'message' => 'Something went wrong and we did not get your details. Please try again later, or send us a message on Facebook.',
	], $wantsJson);
}

respond(200, ['ok' => true], $wantsJson);

/* ---------- Helpers ---------- */

/** Reads a POST value as trimmed text, without control characters, cut to $max characters. */
function post_text(string $name, int $max): string
{
	$value = $_POST[$name] ?? '';
	if (!is_string($value)) {
		return '';
	}
	$value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
	return mb_substr(trim($value), 0, $max, 'UTF-8');
}

/** Removes line breaks, for values that must stay on one line. */
function one_line(string $value): string
{
	return trim(preg_replace('/\s+/u', ' ', $value) ?? '');
}

/** Stops spreadsheet programs from running a cell as a formula. */
function csv_safe(string $value): string
{
	return preg_match('/^[=+\-@\t\r]/', $value) ? "'" . $value : $value;
}

function save_row(string $file, array $row): bool
{
	$dir = dirname($file);
	if (!is_dir($dir) && !mkdir($dir, 0750, true)) {
		return false;
	}

	$isNew  = !is_file($file);
	$handle = fopen($file, 'ab');
	if ($handle === false) {
		return false;
	}

	$ok = flock($handle, LOCK_EX);
	if ($ok) {
		if ($isNew) {
			// UTF-8 byte order mark, so Excel shows Romanian letters correctly.
			fwrite($handle, "\xEF\xBB\xBF");
			fputcsv($handle, array_keys($row), ',', '"', '\\');
		}
		$ok = fputcsv($handle, array_map('csv_safe', array_values($row)), ',', '"', '\\') !== false;
		fflush($handle);
		flock($handle, LOCK_UN);
	}
	fclose($handle);

	return $ok;
}

function send_mail(array $row): bool
{
	if (RECIPIENT_EMAIL === '') {
		return false;
	}

	$labels = [
		'received_at'   => 'Received',
		'company'       => 'Company',
		'contact_name'  => 'Contact person',
		'role'          => 'Role',
		'email'         => 'Email',
		'phone'         => 'Phone',
		'city'          => 'City',
		'participation' => 'Option',
		'players'       => 'Players',
		'future_events' => 'Keep informed about future editions',
		'message'       => 'Message',
	];

	$lines = [];
	foreach ($labels as $key => $label) {
		$value   = $row[$key] !== '' ? $row[$key] : '–';
		$lines[] = $label . ': ' . $value;
	}

	$headers = [
		'MIME-Version: 1.0',
		'Content-Type: text/plain; charset=UTF-8',
		'Content-Transfer-Encoding: 8bit',
		// The email address passed FILTER_VALIDATE_EMAIL, so it has no line breaks.
		'Reply-To: ' . $row['email'],
	];
	if (SENDER_EMAIL !== '') {
		array_unshift($headers, 'From: FRFM website <' . SENDER_EMAIL . '>');
	}

	$subject = '=?UTF-8?B?' . base64_encode(EMAIL_SUBJECT . ': ' . $row['company']) . '?=';

	return mail(RECIPIENT_EMAIL, $subject, implode("\n", $lines) . "\n", implode("\r\n", $headers));
}

/** Sends the answer and stops. JSON for the JavaScript form, HTML when JavaScript is off. */
function respond(int $status, array $body, bool $json): void
{
	http_response_code($status);
	header('Cache-Control: no-store');

	if ($json) {
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($body, JSON_UNESCAPED_UNICODE);
		exit;
	}

	header('Content-Type: text/html; charset=utf-8');

	if (!empty($body['ok'])) {
		$title = 'Thank you. We have your details.';
		$text  = '<p>We will contact you soon to plan your participation.</p>';
	} else {
		$title = 'We could not send the form.';
		$items = '';
		foreach (($body['errors'] ?? []) as $message) {
			$items .= '<li>' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</li>';
		}
		$text = $items !== ''
			? '<ul class="cs-checklist">' . $items . '</ul><p>Please go back and correct the form.</p>'
			: '<p>' . htmlspecialchars($body['message'] ?? 'Please try again.', ENT_QUOTES, 'UTF-8') . '</p>';
	}

	echo '<!DOCTYPE html><html lang="en-US"><head><meta charset="UTF-8">'
		. '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
		. '<meta name="robots" content="noindex">'
		. '<title>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . ' – Romanian Table Soccer Federation</title>'
		. '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;display=swap">'
		. '<link rel="stylesheet" href="assets/css/corporate-series.css"></head><body>'
		. '<main class="cs-section"><div class="container"><div class="cs-section-head">'
		. '<span class="cs-kicker">Corporate Table Soccer Series</span>'
		. '<h1>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</h1>'
		. $text
		. '<a class="btn btn-bordered border-thin" href="./#join"><span><span class="btn-txt">Back to the page</span></span></a>'
		. '</div></div></main></body></html>';
	exit;
}
