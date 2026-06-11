import { useEffect, useRef, useState } from 'react';

let revealIndex = 0;

export default function Reveal({ children, className = '', style, center = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const delayRef = useRef((revealIndex++ % 4) * 90);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const eyebrowStyle = center ? { justifyContent: 'center', ...style } : style;

  return (
    <div
      ref={ref}
      className={`rv ${visible ? 'in' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delayRef.current}ms`, ...eyebrowStyle }}
    >
      {children}
    </div>
  );
}
