/*
 * Corporate Table Soccer Series – frfm.ro
 * Small, dependency-free versions of the Ave theme effects used on frfm.ro
 * (sticky header, parallax hero, split-text heading, back-to-top), plus the
 * contact form submit.
 */
(function () {
	'use strict';

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ---------- Sticky header shadow ---------- */

	var header = document.getElementById('header');

	/* ---------- Back to top ---------- */

	var backToTop = document.querySelector('[data-back-to-top]');

	/* ---------- Parallax hero ---------- */

	var hero = document.querySelector('.cs-hero');
	var figure = hero ? hero.querySelector('.liquid-parallax-figure') : null;

	var ticking = false;

	function onScroll() {
		var y = window.pageYOffset;

		if (header) {
			header.classList.toggle('is-stuck', y > 0);
		}

		if (backToTop) {
			backToTop.classList.toggle('is-visible', y > window.innerHeight * 0.75);
		}

		if (figure && !reduceMotion && y < hero.offsetTop + hero.offsetHeight) {
			figure.style.transform = 'translate3d(0,' + Math.round(y * 0.3) + 'px,0)';
		}

		ticking = false;
	}

	window.addEventListener('scroll', function () {
		if (!ticking) {
			ticking = true;
			window.requestAnimationFrame(onScroll);
		}
	}, { passive: true });

	onScroll();

	/* ---------- Split-text heading (Ave data-split-text) ---------- */

	function splitText(el) {
		var chars = [];
		var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
		var nodes = [];

		while (walker.nextNode()) {
			nodes.push(walker.currentNode);
		}

		nodes.forEach(function (node) {
			var frag = document.createDocumentFragment();

			node.nodeValue.split(/(\s+)/).forEach(function (part) {
				if (!part) {
					return;
				}
				if (/^\s+$/.test(part)) {
					frag.appendChild(document.createTextNode(' '));
					return;
				}

				var word = document.createElement('span');
				word.className = 'lqd-words';

				Array.prototype.forEach.call(part, function (ch) {
					var unit = document.createElement('span');
					var inner = document.createElement('span');
					unit.className = 'lqd-chars';
					inner.className = 'split-inner';
					inner.textContent = ch;
					unit.appendChild(inner);
					word.appendChild(unit);
					chars.push(inner);
				});

				frag.appendChild(word);
			});

			node.parentNode.replaceChild(frag, node);
		});

		return chars;
	}

	var splitHeading = document.querySelector('[data-split-text="true"]');

	if (splitHeading && !reduceMotion) {
		// Screen readers read the original text, not the single letters.
		splitHeading.setAttribute('aria-label', splitHeading.textContent.replace(/\s+/g, ' ').trim());

		var chars = splitText(splitHeading);
		var startDelay = 150;
		var charDelay = 40;

		chars.forEach(function (inner, i) {
			inner.setAttribute('aria-hidden', 'true');
			inner.style.transitionDelay = (startDelay + i * charDelay) + 'ms';
		});

		var highlight = splitHeading.querySelector('.lqd-highlight-inner');
		if (highlight) {
			highlight.style.transitionDelay = (startDelay + chars.length * charDelay) + 'ms';
		}

		splitHeading.classList.add('is-split');

		window.requestAnimationFrame(function () {
			window.requestAnimationFrame(function () {
				splitHeading.classList.add('is-in-view');
			});
		});
	}

	/* ---------- Contact form ---------- */

	var form = document.getElementById('cs-form');

	if (!form || !window.fetch || !window.FormData) {
		return;
	}

	var success = document.getElementById('cs-success');
	var alertBox = form.querySelector('.cs-form-alert');
	var submitButton = form.querySelector('[type="submit"]');
	var spinner = submitButton.querySelector('.fa-spin');

	var messages = {
		company: 'Please enter the name of your company.',
		name: 'Please enter your name.',
		email: 'Please enter a valid email address.',
		phone: 'Please enter a valid phone number, or leave this field empty.',
		participation: 'Please select the option that describes you best.',
		players: 'Please select an estimate.',
		consent: 'Please agree, so that we can contact you.'
	};

	// The browser checks the fields when JavaScript is off.
	// With JavaScript on, the messages below appear next to each field.
	form.noValidate = true;

	function fieldWrap(name) {
		var input = form.elements[name];
		var el = input && (input.length && !input.tagName ? input[0] : input);
		return el ? el.closest('.cs-field') : null;
	}

	function clearErrors() {
		form.querySelectorAll('.cs-field.has-error').forEach(function (wrap) {
			wrap.classList.remove('has-error');
		});
		form.querySelectorAll('.cs-error').forEach(function (msg) {
			msg.remove();
		});
		form.querySelectorAll('[aria-invalid]').forEach(function (input) {
			input.removeAttribute('aria-invalid');
			input.removeAttribute('aria-describedby');
		});
		alertBox.hidden = true;
		alertBox.textContent = '';
	}

	function showError(name, text) {
		var wrap = fieldWrap(name);
		if (!wrap) {
			return;
		}

		var id = 'cs-error-' + name;
		var msg = document.createElement('span');
		msg.className = 'cs-error';
		msg.id = id;
		msg.textContent = text;

		wrap.classList.add('has-error');
		wrap.appendChild(msg);

		wrap.querySelectorAll('[name="' + name + '"]').forEach(function (input) {
			input.setAttribute('aria-invalid', 'true');
			input.setAttribute('aria-describedby', id);
		});
	}

	function validate() {
		var errors = {};

		Object.keys(messages).forEach(function (name) {
			var input = form.elements[name];
			var el = input.length && !input.tagName ? input[0] : input;

			if (!el.checkValidity()) {
				errors[name] = messages[name];
			}
		});

		return errors;
	}

	function focusFirstError() {
		var first = form.querySelector('[aria-invalid="true"]');
		if (first) {
			first.focus();
		}
	}

	function setBusy(busy) {
		submitButton.disabled = busy;
		spinner.hidden = !busy;
	}

	function showAlert(text) {
		alertBox.textContent = text;
		alertBox.hidden = false;
		alertBox.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
	}

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		clearErrors();

		var errors = validate();
		var names = Object.keys(errors);

		if (names.length) {
			names.forEach(function (name) {
				showError(name, errors[name]);
			});
			focusFirstError();
			return;
		}

		setBusy(true);

		fetch(form.action, {
			method: 'POST',
			body: new FormData(form),
			headers: { Accept: 'application/json' },
			credentials: 'same-origin'
		})
			.then(function (response) {
				return response.json().catch(function () {
					return { ok: false };
				}).then(function (data) {
					return { status: response.status, data: data };
				});
			})
			.then(function (result) {
				setBusy(false);

				if (result.data.ok) {
					success.querySelector('.cs-success-email').textContent = form.elements.email.value.trim();
					form.hidden = true;
					success.hidden = false;
					success.focus();
					success.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
					return;
				}

				if (result.data.errors) {
					Object.keys(result.data.errors).forEach(function (name) {
						showError(name, result.data.errors[name]);
					});
					focusFirstError();
					return;
				}

				showAlert(result.data.message || 'Something went wrong and we did not get your details. Please try again, or send us a message on Facebook.');
			})
			.catch(function () {
				setBusy(false);
				showAlert('We could not send the form. Please check your connection and try again, or send us a message on Facebook.');
			});
	});
})();
