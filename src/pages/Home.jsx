import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Truck, Package, Snowflake, Wrench, Maximize, Zap, Anchor, Globe } from 'lucide-react';
import { COMPANY, SERVICES, STATS, VALUES, IMAGES } from '../lib/content.js';
import { CARD, ACCENT, SECTION_BG, ICON_TILE } from '../lib/theme.js';
import Reveal from '../components/Reveal.jsx';

const ICON = { Wrench, Package, Snowflake, Truck, Maximize, Zap, Anchor, Globe };

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-12 gap-10 items-center">
        <Reveal className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-bold text-slate-500 mb-6">
            <span className="w-8 h-px bg-brand-red" />
            JD Premier Logistics · Wills Point, TX
          </div>
          <h1 className="font-display font-extrabold text-5xl lg:text-7xl leading-[1.02] tracking-tight text-slate-900">
            Where <span className="text-brand-blue">Logistics</span><br />
            Meets <span className="text-brand-red">Excellence</span>.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
            A Texas-based 3PL moving full-truckload, hot-shot, and specialized freight across North America. Real dispatchers. Real follow-through.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/quote" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-brand-blue text-white hover:bg-brand-blue-deep font-bold text-[14px] uppercase tracking-wider transition-colors shadow-sm">
              Request a Quote <ArrowRight size={15} />
            </Link>
            <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-slate-300 text-slate-900 hover:bg-slate-50 font-bold text-[14px] uppercase tracking-wider transition-colors">
              <Phone size={14} /> {COMPANY.phone}
            </a>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={IMAGES.heroFlatbed}
                srcSet={IMAGES.heroFlatbedSrcSet}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="JD Premier Logistics fleet — flatbed, dry van, refrigerated, heavy haul, and container freight"
                loading="eager"
                fetchpriority="high"
                className="w-full h-[400px] lg:h-[520px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-white border border-slate-200 rounded-xl shadow-2xl p-5 max-w-[260px]">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-red font-black mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" /> Live
              </div>
              <div className="font-display font-extrabold text-xl text-slate-900">24/7 Dispatch</div>
              <div className="text-[13px] text-slate-600 mt-1">A real person on every call.</div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="border-y border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <div className="font-display font-extrabold text-4xl lg:text-5xl text-brand-blue">{s.value}</div>
              <div className="text-[12px] uppercase tracking-[0.16em] text-slate-500 font-bold mt-1">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="mb-12 lg:mb-16">
          <div className="text-[11px] uppercase tracking-[0.22em] font-bold opacity-60 mb-3">What we believe</div>
          <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight max-w-3xl">
            Service first. <span className={ACCENT}>Always.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <Reveal key={v.title} className={`${CARD} border rounded-xl p-7 hover:shadow-xl transition-shadow`}>
              <div className={`font-display font-extrabold text-xl mb-3 ${ACCENT}`}>{v.title}</div>
              <p className="text-[15px] leading-relaxed opacity-80">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className={`${SECTION_BG} py-20 lg:py-32`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.22em] font-bold opacity-60 mb-3">Capabilities</div>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight max-w-3xl">
              Every freight type, one team.
            </h2>
          </Reveal>
          <Link to="/services" className="inline-flex items-center gap-2 font-bold text-[14px] hover:opacity-70 transition-opacity">
            All services <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => {
            const Icon = ICON[s.icon] || Truck;
            return (
              <Reveal key={s.key} className={`${CARD} border rounded-xl p-7 hover:border-brand-blue/40 hover:shadow-md transition-colors`}>
                <div className={`${ICON_TILE} w-12 h-12 rounded-lg grid place-items-center mb-4`}>
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <div className="font-display font-extrabold text-xl mb-2">{s.title}</div>
                <p className="text-[14px] leading-relaxed opacity-80">{s.blurb}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="bg-brand-ink text-white rounded-3xl p-10 lg:p-20 text-center overflow-hidden relative">
          <h2 className="font-display font-extrabold text-3xl lg:text-6xl tracking-tight max-w-4xl mx-auto">
            Ready to move your freight?
          </h2>
          <p className="mt-5 text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
            Send us the lane and the load. We'll quote it fast, dispatch it faster, deliver it on time.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/quote" className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-black text-[15px] uppercase tracking-wider transition-colors bg-white text-brand-ink hover:bg-slate-100">
              Get a Quote <ArrowRight size={16} />
            </Link>
            <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 px-8 py-4 rounded-md border-2 border-white/30 hover:bg-white/10 font-black text-[15px] uppercase tracking-wider transition-colors">
              <Phone size={14} /> {COMPANY.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Values />
      <ServicesGrid />
      <CTA />
    </>
  );
}
