import { useEffect, useState } from 'react';

export function useScrollMode() {
  const [mode, setMode] = useState('chaos');

  useEffect(() => {
    const sections = document.querySelectorAll('[data-mode]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nextMode = entry.target.dataset.mode;
            setMode(nextMode);
            const defendTheme = nextMode === 'shield' || nextMode === 'defend';
            document.documentElement.dataset.theme = defendTheme ? 'defend' : 'attack';
          }
        });
      },
      { threshold: 0.45 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = 'attack';
    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, []);

  return mode;
}
