import Image from 'next/image';
import Link from 'next/link';
import { smsHref } from '@/lib/site';

export default function Header() {
  const href = smsHref();
  const x = process.env.NEXT_PUBLIC_X_URL || 'https://x.com/launchsmsfun';
  return (
    <header className="siteHeader">
      <div className="navShell">
        <Link className="brand" href="/" aria-label="Launch/SMS home">
          <span className="brandImageWrap"><Image src="/images/logo.png" alt="Launch/SMS" width={122} height={34} priority /></span>
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
