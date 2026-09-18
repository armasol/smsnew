'use client';

import { useEffect, useRef } from 'react';

export default function ProcessRail() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
    const io = new IntersectionObserver((entries) => entries.forEach(e => e.target.classList.toggle('isVisible', e.isIntersecting)), { threshold: .35 });
    cards.forEach(c => io.observe(c));
    return () => io.disconnect();
  }, []);
  return (
    <div className="processRail" ref={ref}>
      {[
        ['01', 'Text LAUNCH', 'Start from the place you already use every day.'],
        ['02', 'Answer the prompts', 'Name, ticker, description, logo, wallet and launch settings.'],
        ['03', 'Review everything', 'The full launch is summarized in the thread before confirmation.'],
        ['04', 'Confirm', 'Reply CONFIRM only when the details look right.'],
        ['05', 'You’re live', 'The token address and explorer link come back in Messages.']
      ].map(([n,t,d]) => <article data-step key={n} className="processCard"><span>{n}</span><h3>{t}</h3><p>{d}</p><div className="processArrow">↗</div></article>)}
    </div>
  );
}
