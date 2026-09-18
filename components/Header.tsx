import Image from 'next/image';
import Link from 'next/link';
import { smsHref } from '@/lib/site';

export default function Header() {
  const href = smsHref();
  const x = 'https://x.com/imsgfun';
  return (
    <header className="siteHeader">
      <div className="navShell">
        <Link className="brand" href="/" aria-label="Launch/SMS home">
          <span className="brandImageWrap"><Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_new-BPlSuEzmYOEoOM3XBPYym07d6CucZU.png" alt="IMSG" width={112} height={51} priority /></span>
          <span className="brandFallback">LAUNCH/SMS</span>
        </Link>
        <nav className="navLinks" aria-label="Main navigation">
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/docs">Docs</Link>
          <a href={x} target="_blank" rel="noreferrer">X</a>
        </nav>
        <a className="button buttonSmall buttonDark" href={href}>Launch with SMS <span>↗</span></a>
      </div>
    </header>
  );
}
