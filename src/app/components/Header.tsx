'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

// import { Menu, X } from 'lucide-react'; // можно любую иконку или кастомную

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (path: string) =>
    `text-center leading-tight font-bold ${
      pathname === path ? 'text-red-500' : 'text-white'
    }`;

  const navLinks = [
    { href: '/about', label1: 'About', label2: 'as' },
    { href: '/gallery/photo', label1: 'My', label2: 'Photo' },
    {
      href: '/gallery/photoFromInternet',
      label1: 'Photo from',
      label2: 'the Internet',
    },
    { href: '/gallery/video', label1: 'My', label2: 'Video' },
    {
      href: '/gallery/videoFromInternet',
      label1: 'Video from',
      label2: 'the Internet',
    },
    { href: '/gallery/myEquipment', label1: 'My', label2: 'equipment' },
    {
      href: '/gallery/howToDoItCorrectly',
      label1: 'How to do',
      label2: 'it correctly',
    },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-gray-500 bg-cover bg-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Логотип */}
        <Link
          href="/"
          className="flex items-center h-[50px] w-[100px] justify-center shrink-0"
        >
          <svg
            height="50"
            className="drop-shadow-[2px_2px_4px_black] w-full h-full"
          >
            <use href="/sprite.svg#icon-logogrey"></use>
          </svg>
        </Link>

        {/* Навигация — скрыта на мобилке */}
        <nav
          className={`hidden lg:flex gap-6 text-white text-[16px] font-bold text-center whitespace-nowrap transition-all duration-300`}
          style={{ textShadow: '2px 2px 4px black' }}
        >
          {navLinks.map(({ href, label1, label2 }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              <span>{label1}</span>
              <br />
              <span>{label2}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white"
        >
          {menuOpen ? (
            <svg className="drop-shadow-[2px_2px_4px_black] w-28 h-20">
              <use xlinkHref="/sprite1.svg#icon-logoX"></use>
            </svg>
          ) : (
            <svg className="drop-shadow-[2px_2px_4px_black] w-28 h-20">
              <use xlinkHref="/sprite1.svg#icon-logoMenu"></use>
            </svg>
          )}
        </button>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-4 space-y-4 bg-gray-900 bg-opacity-80 text-white text-center text-sm font-bold">
          {navLinks.map(({ href, label1, label2 }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block"
            >
              <span>{label1}</span> <span>{label2}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
