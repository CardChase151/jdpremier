// Receives quote-form submissions from the JD Premier site and emails
// Jacob via Resend. Reply-To is set to the customer's email so Jacob can
// hit reply and message them directly.
//
// Required Netlify env vars:
//   RESEND_API_KEY  — your Resend secret
//   QUOTE_TO        — recipient (default: jacob@jdpremierlog.com)
//   QUOTE_FROM      — sender (default: dispatch@mysendz.com)

const TO_DEFAULT   = 'jacob@jdpremierlog.com';
const FROM_DEFAULT = 'JD Premier Quotes <dispatch@mysendz.com>';

const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const row = (label, value) =>
  value
    ? `<tr><td style="padding:8px 16px 8px 0;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px 0;color:#1a1a1a;font-size:15px;vertical-align:top">${escapeHtml(value)}</td></tr>`
    : '';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const {
    first_name = '', last_name = '', company = '',
    phone = '', email = '',
    pickup = '', delivery = '',
    service_type = '', pickup_date = '',
    load_details = '',
    bot = '', // honeypot
  } = payload;

  if (bot) return { statusCode: 200, body: '{}' }; // silent drop spam
  if (!email || !phone || !first_name) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: 'RESEND_API_KEY not configured' };
  }

  const customerName = [first_name, last_name].filter(Boolean).join(' ');
  const subject = `New Quote Request — ${customerName}${pickup && delivery ? ` · ${pickup} → ${delivery}` : ''}`;

  const html = `
<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f7f8fa;padding:24px;margin:0">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:#0E2D70;color:#fff;padding:24px 28px">
      <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;font-weight:700;opacity:0.8">JD Premier Logistics</div>
      <div style="font-size:22px;font-weight:900;margin-top:4px">New Quote Request</div>
    </div>
    <div style="padding:24px 28px">
      <table style="width:100%;border-collapse:collapse">
        ${row('Name', customerName)}
        ${row('Company', company)}
        ${row('Phone', phone)}
        ${row('Email', email)}
        ${row('Pickup', pickup)}
        ${row('Delivery', delivery)}
        ${row('Service', service_type)}
        ${row('Pickup Date', pickup_date)}
        ${load_details ? `<tr><td colspan="2" style="padding-top:18px;border-top:1px solid #e5e7eb;margin-top:18px"><div style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;padding-top:12px">Load Details</div><div style="color:#1a1a1a;font-size:14px;line-height:1.55;margin-top:6px;white-space:pre-wrap">${escapeHtml(load_details)}</div></td></tr>` : ''}
      </table>
      <div style="margin-top:24px;padding:16px;background:#f7f8fa;border-radius:8px;font-size:13px;color:#666">
        Reply to this email to respond to the customer directly.
      </div>
    </div>
    <div style="background:#D72027;color:#fff;padding:12px 28px;font-size:11px;text-align:center;letter-spacing:0.18em;font-weight:700;text-transform:uppercase">
      jdpremierlog.com
    </div>
  </div>
</body></html>`;

  const text = [
    `New Quote Request`,
    ``,
    `Name: ${customerName}`,
    company ? `Company: ${company}` : null,
    `Phone: ${phone}`,
    `Email: ${email}`,
    pickup ? `Pickup: ${pickup}` : null,
    delivery ? `Delivery: ${delivery}` : null,
    service_type ? `Service: ${service_type}` : null,
    pickup_date ? `Pickup Date: ${pickup_date}` : null,
    load_details ? `\nLoad Details:\n${load_details}` : null,
    ``,
    `Reply to this email to respond to the customer directly.`,
  ].filter(Boolean).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM || FROM_DEFAULT,
      to: [process.env.QUOTE_TO || TO_DEFAULT],
      reply_to: email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    return { statusCode: 502, body: `Email send failed: ${err}` };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true }),
  };
};
