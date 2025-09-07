import React from 'react';
import './globals.css';
import Header from './components/Header';
import { Metadata } from 'next';
import KeyboardManager from './components/KeyboardManager';

export const metadata: Metadata = {
  title: 'Art Gallery',
  description:
    'Картини художниці Світлани Точинської — світ емоцій та натхнення.',
  icons: {
    icon: '/previous-up.jpg',
  },
  openGraph: {
    title: 'Art Gallery',
    description:
      'Картини художниці Світлани Точинської — світ емоцій та натхнення.',
    url: 'https://art-gallery-front-next-one.vercel.app',
    siteName: 'Art Gallery',
    images: [
      {
        url: '/previous.jpg',
        width: 1200,
        height: 630,
        alt: 'Art Gallery preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Art Gallery',
    description:
      'Картини художниці Світлани Точинської — світ емоцій та натхнення.',
    images: ['/previous.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#333333]">
        <Header />
        {children}
        <KeyboardManager />
      </body>
    </html>
  );
}
