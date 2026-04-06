import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Analytics from '@/components/Analytics';

export const metadata: Metadata = {
  title: 'Quill',
  description: 'AI Writing Studio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@400;500;600&display=swap'
            rel='stylesheet'
          />
        </head>{' '}
        <Analytics />
        <body className='bg-surface text-ink font-sans'>{children}</body>{' '}
      </html>
    </ClerkProvider>
  );
}
