'use client';

import { useEffect, useRef, useState } from 'react';

type Stage = 0 | 1 | 2 | 3 | 4;

const conversation = [
  { who: 'user', text: 'LAUNCH' },
  { who: 'system', text: 'What should your token be called?' },
  { who: 'user', text: 'Orbit' },
  { who: 'system', text: 'Ticker?' },
  { who: 'user', text: 'ORBIT' },
  { who: 'system', text: 'Review ready. Reply CONFIRM when you are ready.' },
  { who: 'user', text: 'CONFIRM' },
  { who: 'system', text: 'Launch confirmed. Your token is live.' }
];

export default function PhoneStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<Stage>(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const max = Math.max(1, rect.height - window.innerHeight);
      const p = Math.max(0, Math.min(1, -rect.top / max));
      setProgress(p);
      setStage((p < .18 ? 0 : p < .38 ? 1 : p < .58 ? 2 : p < .78 ? 3 : 4) as Stage);
    };
    const request = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    return () => { window.removeEventListener('scroll', request); window.removeEventListener('resize', request); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const revealCount = stage === 0 ? 1 : stage === 1 ? 3 : stage === 2 ? 5 : stage === 3 ? 7 : 8;
  const phoneY = 110 - Math.min(progress / .22, 1) * 110;
  const phoneScale = .9 + Math.min(progress / .35, 1) * .1;

  return (
    <section ref={sectionRef} className="phoneStory" id="how-it-works">
      <div className="storySticky">
        <div className="storyGrid" aria-hidden="true" />
        <div className="storyHalo" aria-hidden="true" />
        <div className={`storySide left stage${stage}`}>
          <span className="microTag">01 / START</span>
          <h3>{stage < 2 ? 'One text starts it.' : stage < 4 ? 'Only answer what matters.' : 'Confirm once.'}</h3>
          <p>{stage < 2 ? 'Open Messages and text LAUNCH.' : stage < 4 ? 'The thread guides you through the token details in order.' : 'You see the final details before anything moves forward.'}</p>
        </div>
        <div className={`storySide right stage${stage}`}>
          <span className="microTag">{stage < 3 ? 'IN THE THREAD' : 'READY WHEN YOU ARE'}</span>
          <div className="storyMetric"><span>{stage < 3 ? 'No dashboard' : 'One confirmation'}</span><strong>{stage < 3 ? 'Required' : 'to continue'}</strong></div>
        </div>
        <div className="phoneWrap" style={{ transform: `translate3d(-50%, ${phoneY}px, 0) scale(${phoneScale})` }}>
          <div className="phoneShadow" />
          <div className="phoneFrame">
            <div className="phoneTop"><span className="phoneTime">9:41</span><div className="dynamicIsland"/><div className="phoneSignals">•••</div></div>
            <div className="messageHeader"><span className="back">‹</span><div className="messageIdentity"><div className="messageLogo">↗</div><div><strong>Launch/SMS</strong><small>Messages</small></div></div><span className="info">ⓘ</span></div>
            <div className="messageBody">
              <div className="dayLabel">Today 9:41 AM</div>
              {conversation.slice(0, revealCount).map((m, i) => <div key={i} className={`bubble ${m.who}`}>{m.text}</div>)}
            </div>
            <div className="messageComposer"><span>＋</span><div>iMessage</div><span>↑</span></div>
          </div>
        </div>
        <div className="storyProgress"><span style={{ width: `${Math.max(4, progress * 100)}%` }} /></div>
      </div>
    </section>
  );
}
