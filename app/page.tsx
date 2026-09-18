import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhoneStory from '@/components/PhoneStory';
import ProcessRail from '@/components/ProcessRail';
import LaunchBand from '@/components/LaunchBand';
import { publicPhoneDisplay, smsHref } from '@/lib/site';

export default function HomePage() {
  return (
    <main>
      <Header />
      <section className="hero">
        <div className="heroGrid" />
        <div className="heroFloat floatA"><i/> Text-first launch</div>
        <div className="heroFloat floatB"><i/> Review before confirm</div>
        <div className="heroFloat floatC"><i/> Robinhood Chain</div>
        <div className="signalOrb" aria-hidden="true">
          <div className="orbRing ring1"/><div className="orbRing ring2"/><div className="orbRing ring3"/>
          <div className="orbPhone"><div className="orbNotch"/><div className="orbMessage m1"/><div className="orbMessage m2"/><div className="orbMessage m3"/></div>
        </div>
        <div className="heroCopy">
          <span className="eyebrow pillEyebrow">MESSAGES → REVIEW → CONFIRM</span>
          <h1>Launch from<br/><span>a text.</span></h1>
          <p>Text the token details. Review everything in one thread. Confirm only when you are ready.</p>
          <div className="heroActions"><a href={smsHref()} className="button buttonBlue">Text LAUNCH <span>↗</span></a><a href="#how-it-works" className="button buttonGhost">See how it works <span>↓</span></a></div>
          <div className="heroNumber">CONNECT NUMBER <strong>{publicPhoneDisplay()}</strong></div>
        </div>
        <div className="heroBottomLine"><span>One thread</span><span>Guided prompts</span><span>Final review</span><span>Onchain confirmation</span></div>
      </section>

      <section className="blackTicker" aria-label="Launch flow">
        <div className="tickerTrack"><span>TEXT LAUNCH</span><b>→</b><span>ANSWER THE PROMPTS</span><b>→</b><span>REVIEW YOUR TOKEN</span><b>→</b><span>CONFIRM</span><b>→</b><span>YOU’RE LIVE</span><b>→</b><span>TEXT LAUNCH</span><b>→</b><span>ANSWER THE PROMPTS</span></div>
      </section>

      <section className="introSection sectionPad">
        <div className="sectionLabel">THE PRODUCT</div>
        <div className="introHeading"><h2>Less dashboard.<br/>More conversation.</h2><p>Launch/SMS turns the token setup process into a guided thread. You answer one thing at a time, see the final summary, and decide when to continue.</p></div>
        <div className="threadPanel">
          <div className="panelTop"><span>01 / YOUR THREAD</span><span>THE INTERFACE IS THE CONVERSATION</span></div>
          <div className="threadContent">
            <div className="threadPrompt"><span>LAUNCH/SMS</span><strong>What should your token be called?</strong></div>
            <div className="threadAnswer">Orbit</div>
            <div className="threadPrompt second"><span>LAUNCH/SMS</span><strong>Ticker?</strong></div>
            <div className="threadAnswer secondAnswer">ORBIT</div>
          </div>
          <div className="panelFoot"><span>No giant form.</span><span>No hunting for the next step.</span></div>
        </div>
      </section>

      <PhoneStory />

      <section className="stepsSection sectionPad">
        <div className="sectionLabel">HOW IT WORKS</div>
        <div className="centerHeading"><h2>Five steps. One thread.</h2><p>The service keeps the sequence clear from the first message through confirmation.</p></div>
        <ProcessRail />
      </section>

      <section className="controlSection sectionPad">
        <div className="sectionLabel">YOU STAY IN CONTROL</div>
        <div className="splitHeading"><h2>Nothing moves forward until you say so.</h2><p>Every launch stops at a final review. Edit it, cancel it, or confirm it from the same conversation.</p></div>
        <div className="controlGrid">
          <article className="controlCard wide"><div className="cardIndex">01</div><h3>Review the whole launch.</h3><p>Name, ticker, description, creator wallet and launch settings are summarized before confirmation.</p><div className="reviewMock"><div><span>ORBIT</span><small>$ORBIT</small></div><div><span>Creator wallet</span><small>0x82…91D</small></div><div><span>Status</span><small>Ready to confirm</small></div></div></article>
          <article className="controlCard"><div className="cardIndex">02</div><h3>Go back.</h3><p>Reply <strong>BACK</strong> to change the previous answer without restarting the thread.</p><div className="commandChip">BACK ↵</div></article>
          <article className="controlCard"><div className="cardIndex">03</div><h3>Cancel cleanly.</h3><p>Reply <strong>CANCEL</strong> and the active launch session stops.</p><div className="commandChip">CANCEL ↵</div></article>
        </div>
      </section>

      <section className="docsPreview sectionPad">
        <div className="docsPreviewInner">
          <div><span className="sectionLabel inside">CLEAR BY DESIGN</span><h2>Know what happens before you text.</h2><p>The docs explain the exact customer flow, what information is requested, how editing works, and what confirmation means.</p><a className="button buttonDark" href="/docs">Read the docs <span>↗</span></a></div>
          <div className="docsStack">
            <div className="docLine"><span>01</span><strong>Starting a launch</strong><em>Text LAUNCH</em></div>
            <div className="docLine"><span>02</span><strong>Token details</strong><em>Guided prompts</em></div>
            <div className="docLine"><span>03</span><strong>Review</strong><em>Edit or continue</em></div>
            <div className="docLine"><span>04</span><strong>Confirmation</strong><em>Reply CONFIRM</em></div>
          </div>
        </div>
      </section>

      <LaunchBand />
      <Footer />
    </main>
  );
}
