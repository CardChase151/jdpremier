import Reveal from './Reveal.jsx';

export default function PageHero({ eyebrow, title, sub }) {
  return (
    <section className="relative bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <Reveal>
          {eyebrow && (
            <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500 font-bold mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-brand-red" />{eyebrow}
            </div>
          )}
          <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tight leading-[1] text-slate-900 max-w-4xl">{title}</h1>
          {sub && <p className="mt-6 text-lg text-slate-600 max-w-2xl leading-relaxed">{sub}</p>}
        </Reveal>
      </div>
    </section>
  );
}
