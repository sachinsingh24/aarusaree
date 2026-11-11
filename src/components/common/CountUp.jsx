import { useEffect, useRef, useState } from 'react';

/**
 * Counts a stat like "10,000+" or "40+" up from 0 when it scrolls into view.
 * Years (e.g. "2016") and non-numeric values are shown as they are; reduced motion skips the animation.
 */
export default function CountUp({ value, duration = 1600 }) {
  const match = /^(\d[\d,]*)(\D*)$/.exec(String(value));
  const target = match ? Number(match[1].replace(/,/g, '')) : null;
  const suffix = match ? match[2] : '';
  const animate = target !== null && !/^\d{4}$/.test(String(value)) && target > 0;

  const ref = useRef(null);
  const [current, setCurrent] = useState(animate ? 0 : null);

  useEffect(() => {
    if (!animate) return undefined;
    const el = ref.current;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setCurrent(target);
      return undefined;
    }
    let raf;
    let io;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      io.disconnect();
      window.removeEventListener('scroll', checkPosition);
      const startTime = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setCurrent(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const checkPosition = () => {
      if (el.getBoundingClientRect().top <= window.innerHeight) start();
    };
    io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
    }, { rootMargin: '0px 0px 100px 0px' });
    io.observe(el);
    window.addEventListener('scroll', checkPosition, { passive: true });
    checkPosition();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', checkPosition);
      cancelAnimationFrame(raf);
    };
  }, [animate, target, duration]);

  if (!animate) return <span>{value}</span>;
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {current.toLocaleString('en-IN')}
        {suffix}
      </span>
    </span>
  );
}
