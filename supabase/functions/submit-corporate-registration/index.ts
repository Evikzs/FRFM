// Supabase Edge Function: saves a Corporate Series registration.
// Same contract as the site's other public form functions: the client calls
// supabase.functions.invoke(...) and gets { ok: true } on success.
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const PARTICIPATION = ['company', 'team', 'colleagues']
const PLAYERS = ['2-4', '5-10', '11-20', '20+', 'unsure']
const LANGUAGES = ['en', 'ro']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^[0-9 +().\-/]{6,40}$/

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

/** One-line text: no control characters, single spaces, cut to max characters. */
function line(value: unknown, max: number) {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max)
}

/** Multi-line text: keeps line breaks, removes other control characters. */
function block(value: unknown, max: number) {
  if (typeof value !== 'string') return ''
  return value.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').trim().slice(0, max)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405)

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400)
  }

  // Spam trap: people never see the "website" field. Answer ok, save nothing.
  if (line(body.website, 200)) return json({ ok: true })

  const row = {
    company: line(body.company, 150),
    contact_name: line(body.name, 120),
    role: line(body.role, 120) || null,
    email: line(body.email, 254).toLowerCase(),
    phone: line(body.phone, 40) || null,
    city: line(body.city, 80) || null,
    participation: line(body.participation, 20),
    players: line(body.players, 20),
    message: block(body.message, 2000) || null,
    wants_updates: body.updates === true,
    language: LANGUAGES.includes(line(body.language, 5)) ? line(body.language, 5) : 'en',
  }

  const invalid: string[] = []
  if (!row.company) invalid.push('company')
  if (!row.contact_name) invalid.push('name')
  if (!EMAIL.test(row.email)) invalid.push('email')
  if (row.phone && !PHONE.test(row.phone)) invalid.push('phone')
  if (!PARTICIPATION.includes(row.participation)) invalid.push('participation')
  if (!PLAYERS.includes(row.players)) invalid.push('players')
  if (invalid.length) return json({ ok: false, error: 'invalid', fields: invalid }, 422)

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false },
  })

  const { error } = await supabase.from('corporate_series_registrations').insert(row)
  if (error) {
    console.error('corporate registration insert failed', error)
    return json({ ok: false, error: 'insert_failed' }, 500)
  }

  return json({ ok: true })
})
