import { MapPin, Shield, Phone } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { STATS, ABOUT_STORY } from '../lib/content.js';
import { CARD, ACCENT } from '../lib/theme.js';

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About JD Premier"
        title="A logistics partner built on relationships, not portals."
        sub="We're a 3PL based in Wills Point, Texas, moving full-truckload and hot-shot freight across North America for shippers who want a real person on the line."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 space-y-16">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.22em] font-bold opacity-60 mb-3">Our story</div>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
              Young brokerage. <span className={ACCENT}>Industry-deep roots.</span>
            </h2>
            <div className="space-y-5 text-lg leading-relaxed opacity-90">
              {ABOUT_STORY.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: MapPin, title: 'Based in Texas', body: 'Wills Point, TX. We know the lanes — Dallas, Houston, San Antonio, all directions out.' },
              { icon: Shield, title: 'Fully insured', body: 'Carrier vetting, contingent cargo, and full liability on every load. Docs available on request.' },
              { icon: Phone, title: '24/7 dispatch', body: 'A real person answers. Day, night, weekends, holidays. Service is the product.' },
            ].map((b) => (
              <Reveal key={b.title} className={`${CARD} border rounded-xl p-6`}>
                <div className={`${ACCENT} mb-3`}><b.icon size={24} strokeWidth={2.2} /></div>
                <div className="font-display font-extrabold text-lg mb-2">{b.title}</div>
                <p className="text-[14px] leading-relaxed opacity-80">{b.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200 text-center sm:text-left">
            {STATS.map((s) => (
              <Reveal key={s.label}>
                <div className={`font-display font-extrabold text-4xl lg:text-5xl ${ACCENT}`}>{s.value}</div>
                <div className="text-[11px] uppercase tracking-[0.14em] opacity-60 font-bold mt-2">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
