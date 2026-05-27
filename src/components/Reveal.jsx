import { useEffect, useRef, useState } from 'react';

/**
 * Mobile-friendly reveal-on-scroll wrapper.
 *
 * Replaces `<motion.div whileInView={{ opacity: 1, y: 0 }} ...>` which
 * causes scroll jank on phones because every triggered animation runs a
 * transform + layout pass. This uses a single IntersectionObserver per
 * element and an opacity-only CSS transition (no layout shift, no
 * compositor pressure).
 *
 * - delay: optional ms; capped low so scroll-past doesn't stack tons of
 *   queued animations.
 * - as: element tag, default 'div'.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip observer entirely if user prefers reduced motion — show immediately.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setShown(true); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      });
    }, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.05,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const mergedStyle = delay
    ? { ...(style || {}), transitionDelay: `${Math.min(delay, 200)}ms` }
    : style;

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'reveal-on' : ''} ${className}`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
