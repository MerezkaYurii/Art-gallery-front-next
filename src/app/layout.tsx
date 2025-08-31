import React from 'react';
import './globals.css';
import Header from './components/Header';
import { Metadata } from 'next';
import KeyboardManager from './components/KeyboardManager';

export const metadata: Metadata = {
  title: 'Art Gallery',
  description: 'Описание сайта',
  icons: {
    icon: '/pictureForHead.jpg',
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
