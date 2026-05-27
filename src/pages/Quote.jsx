import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { COMPANY, SERVICES } from '../lib/content.js';
import { FIELD, BTN } from '../lib/theme.js';

// POST to our Netlify Function which sends the email via Resend
// (from dispatch@mysendz.com → jacob@jdpremierlog.com, reply-to = customer).
async function submitQuote(formEl) {
  const fd = new FormData(formEl);
  const payload = Object.fromEntries(fd.entries());
  const res = await fetch('/.netlify/functions/quote-submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`submit failed: ${res.status} ${txt}`);
  }
}

export default function Quote() {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      await submitQuote(e.target);
      setSubmitted(true);
    } catch (e2) {
      setErr(`Couldn't send. Please call ${COMPANY.phone} or email ${COMPANY.quoteEmail || COMPANY.email}.`);
    } finally {
      setBusy(false);
    }
  };

  const fieldCls = 'w-full rounded-lg border px-4 py-3 text-[15px] outline-none transition focus:ring-2';
  const labelCls = 'text-[11px] uppercase tracking-[0.14em] font-bold opacity-70 mb-2 block';

  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Tell us the lane and the load."
        sub="A dispatcher will reach out the same day with a quote and capacity options. No portal logins, no waiting on hold."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          {submitted ? (
            <Reveal className="text-center py-16">
              <div className="inline-flex w-20 h-20 rounded-full bg-green-100 text-green-700 grid place-items-center mb-6">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="font-display font-extrabold text-3xl lg:text-4xl mb-3">Got it. We're on it.</h2>
              <p className="text-lg opacity-80 max-w-xl mx-auto">
                A dispatcher will reach out shortly. If it's urgent, call <a href={`tel:${COMPANY.phone}`} className="font-bold underline">{COMPANY.phone}</a> — we answer 24/7.
              </p>
            </Reveal>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Honeypot — real humans never fill this */}
              <input type="text" name="bot" tabIndex="-1" autoComplete="off"
                style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />


              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>First Name</label><input name="first_name" required className={`${fieldCls} ${FIELD}`} placeholder="Jacob" /></div>
                <div><label className={labelCls}>Last Name</label><input name="last_name" required className={`${fieldCls} ${FIELD}`} placeholder="Davis" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Company</label><input name="company" className={`${fieldCls} ${FIELD}`} placeholder="Your shipper" /></div>
                <div><label className={labelCls}>Phone</label><input name="phone" type="tel" required className={`${fieldCls} ${FIELD}`} placeholder="(555) 555-5555" /></div>
              </div>
              <div><label className={labelCls}>Email</label><input name="email" type="email" required className={`${fieldCls} ${FIELD}`} placeholder="you@company.com" /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Pickup City, State</label><input name="pickup" required className={`${fieldCls} ${FIELD}`} placeholder="Dallas, TX" /></div>
                <div><label className={labelCls}>Delivery City, State</label><input name="delivery" required className={`${fieldCls} ${FIELD}`} placeholder="Atlanta, GA" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Service Type</label>
                  <select name="service_type" className={`${fieldCls} ${FIELD}`} defaultValue="">
                    <option value="" disabled>Select…</option>
                    {SERVICES.map(s => <option key={s.key} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div><label className={labelCls}>Pickup Date</label><input name="pickup_date" type="date" className={`${fieldCls} ${FIELD}`} /></div>
              </div>
              <div><label className={labelCls}>Load Details</label><textarea name="load_details" rows={4} className={`${fieldCls} ${FIELD}`} placeholder="Weight, dimensions, commodity, special handling…" /></div>

              {err && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-md px-4 py-3 text-[14px]">
                  {err}
                </div>
              )}

              <button type="submit" disabled={busy} className={`${BTN} w-full inline-flex items-center justify-center gap-2 rounded-md px-6 py-4 font-black text-[14px] uppercase tracking-wider transition-colors ${busy ? 'opacity-60 cursor-wait' : ''}`}>
                <Send size={16} /> {busy ? 'Sending…' : 'Send Quote Request'}
              </button>
              <p className="text-[12px] opacity-60 text-center">We respond same-day. For urgent loads, call {COMPANY.phone}.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
