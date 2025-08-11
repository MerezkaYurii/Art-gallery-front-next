import React from 'react';
import './globals.css';
import Header from './components/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Art Gallery',
  description: 'Описание сайта',
  icons: {
    icon: '/LOGOtop.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header />
      <body>{children}</body>
    </html>
  );
}
