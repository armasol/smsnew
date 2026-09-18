import { smsHref, publicPhoneDisplay } from '@/lib/site';

export default function LaunchBand() {
  return (
    <section className="launchBand">
      <div className="launchBandGlow"/>
      <div>
        <span className="eyebrow light">READY WHEN YOU ARE</span>
        <h2>Start with one word.</h2>
        <p>Text <strong>LAUNCH</strong>. The rest happens in the thread.</p>
      </div>
      <div className="launchBandActions"><a className="button buttonBlue lightBtn" href={smsHref()}>Open Messages <span>↗</span></a><span className="phoneNumber">{publicPhoneDisplay()}</span></div>
    </section>
  );
}
