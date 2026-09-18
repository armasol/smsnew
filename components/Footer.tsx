import Link from 'next/link';
import Image from 'next/image';
import { smsHref } from '@/lib/site';

export default function Footer() {
  const x = 'https://x.com/imsgfun';
  return (
    <footer className="footer">
      <div className="footerTop">
        <div>
          <div className="footerBrand"><Image src="/images/logo.png" alt="Launch/SMS" width={128} height={36} /><span>LAUNCH/SMS</span></div>
          <p>Start in Messages. Finish onchain.</p>
        </div>
        <a href={smsHref()} className="button buttonBlue">Text LAUNCH <span>↗</span></a>
      </div>
      <div className="footerGrid">
        <div><div className="eyebrow">Product</div><Link href="/#how-it-works">How it works</Link><Link href="/docs">Docs</Link></div>
        <div><div className="eyebrow">Legal</div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        <div><div className="eyebrow">Social</div><a href={x} target="_blank" rel="noreferrer">X / Twitter</a></div>
      </div>
      <div className="footerBottom"><span>© {new Date().getFullYear()} Launch/SMS</span><span>Independent product. Not affiliated with Robinhood Markets, Inc.</span></div>
    </footer>
  );
}
