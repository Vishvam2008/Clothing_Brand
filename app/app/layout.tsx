import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ArenaX',
    template: '%s • ArenaX'
  },
  description: 'Elite esports tournaments for Free Fire and BGMI. Compete. Win. Dominate.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="arenax-bg" />
        <div className="arenax-grid" />
        {children}
      </body>
    </html>
  );
}

