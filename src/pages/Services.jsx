import { Wrench, Package, Snowflake, Truck, Maximize, Zap, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { SERVICES } from '../lib/content.js';
import { CARD, ACCENT, SECTION_BG, ICON_TILE } from '../lib/theme.js';

const ICON = { Wrench, Package, Snowflake, Truck, Maximize, Zap };

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every freight type. One team. One promise."
        sub="Full truckload to hot shot, flatbed to reefer, oversize to box truck. If it rolls, we move it."
      />

      <section className={`${SECTION_BG} py-20 lg:py-28`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => {
              const Icon = ICON[s.icon] || Truck;
              return (
                <Reveal key={s.key} className={`${CARD} border rounded-xl p-7 hover:border-brand-blue/40 hover:shadow-md transition-colors`}>
                  <div className={`${ICON_TILE} w-14 h-14 rounded-xl grid place-items-center mb-5`}>
                    <Icon size={26} strokeWidth={2.2} />
                  </div>
                  <div className="font-display font-extrabold text-2xl mb-3">{s.title}</div>
                  <p className="text-[15px] leading-relaxed opacity-80 mb-5">{s.blurb}</p>
                  <ul className="space-y-2 text-[13px] opacity-75">
                    {['Insured & vetted carriers', 'Real-time tracking', '24/7 dispatch'].map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className={ACCENT} /> {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
