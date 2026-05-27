import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { COMPANY } from '../lib/content.js';
import { CARD, ACCENT } from '../lib/theme.js';

export default function Contact() {
  const items = [
    { icon: Phone, label: '24/7 Dispatch', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
    { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: MapPin, label: 'Headquarters', value: COMPANY.location, href: null },
    { icon: Clock, label: 'Dispatch Hours', value: '24 hours · 7 days', href: null },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="A real person, every time."
        sub="Call our dispatch, send an email, or drop a quote request. We get back to every inquiry the same day."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((it) => (
              <Reveal key={it.label} className={`${CARD} border rounded-xl p-7`}>
                <div className={`${ACCENT} mb-3`}><it.icon size={26} strokeWidth={2.2} /></div>
                <div className="text-[11px] uppercase tracking-[0.18em] font-bold opacity-60 mb-1">{it.label}</div>
                {it.href ? (
                  <a href={it.href} className="font-display font-extrabold text-2xl hover:opacity-70 transition-opacity">
                    {it.value}
                  </a>
                ) : (
                  <div className="font-display font-extrabold text-2xl">{it.value}</div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
