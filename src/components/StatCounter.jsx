import { useEffect, useRef, useState } from 'react';

export default function StatCounter({ count, decimals = 0, prefix = null, suffix = null }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(count);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    if (!started) return undefined;

    const t0 = performance.now();
    const dur = 1600;
    let rafId = 0;

    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const ease = 1 - (1 - p) ** 3;
      setValue(count * ease);
      if (p < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, count]);

  return (
    <div ref={ref} className="num">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </div>
  );
}
