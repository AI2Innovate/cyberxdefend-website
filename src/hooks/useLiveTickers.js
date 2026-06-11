import { useEffect, useRef, useState } from 'react';

const fmt = (n) => n.toLocaleString('en-US');

export function useLiveTickers() {
  const startRef = useRef(Date.now());
  const [phish, setPhish] = useState(0);
  const [ransom, setRansom] = useState(0);
  const [clock, setClock] = useState('24:00:00');

  useEffect(() => {
    const tick = () => {
      const s = (Date.now() - startRef.current) / 1000;
      setPhish(Math.floor(s * 39352));
      setRansom(Math.floor(s / 11));

      const rem = Math.max(0, 24 * 3600 - s);
      const hh = String(Math.floor(rem / 3600)).padStart(2, '0');
      const mm = String(Math.floor((rem % 3600) / 60)).padStart(2, '0');
      const ss = String(Math.floor(rem % 60)).padStart(2, '0');
      setClock(`${hh}:${mm}:${ss}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { phish: fmt(phish), ransom: fmt(ransom), livePhish: fmt(phish), clock };
}
