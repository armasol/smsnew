import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Launch/SMS — Launch with a text', template: '%s — Launch/SMS' },
  description: 'Start a token launch from Messages. Answer the prompts, review the details, and confirm.',
  icons: { icon: '/images/favicon.png', apple: '/images/favicon.png' },
  metadataBase: new URL('https://launchsms.fun'),
  openGraph: {
    title: 'Launch/SMS — Launch with a text',
    description: 'Start in Messages. Answer the prompts. Confirm when you are ready.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
