'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: '/pages/aboutMe', labelUk: 'Про мене', labelEn: 'About me' },
    { href: '/pages/catalog', labelUk: 'Каталог', labelEn: 'Catalog' },
    { href: '/pages/gallery', labelUk: 'Галерея', labelEn: 'Gallery' },
  ];

  return (
    <header className="max-w-7xl mx-auto relative w-full h-20 sm:h-24 md:h-28 top-0 z-50 bg-gradient-to-r from-gray-500 via-white to-gray-500  mb-4">
      <div className="absolute left-0 top-0 h-full w-auto aspect-[2/1]">
        <Image
          src="/header_left.png"
          alt="Left header decoration"
          className="object-contain"
          fill
        />
      </div>

      <div className="absolute right-0 top-0 h-full w-auto aspect-[2/1]">
        <Image
          src="/header_right.png"
          alt="Right header decoration"
          className="object-contain"
          fill
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <nav className="hidden sm:flex  lg:flex gap-6 mx-auto font-bold text-center whitespace-nowrap transition-all duration-300">
          <ul
            className="flex gap-12 text-[20px] text-fuchsia-800 font-bold"
            style={{ textShadow: '2px 2px 4px white' }}
          >
            {navItems.map((item) => (
              <li key={item.href} className="text-center">
                <Link
                  href={item.href}
                  className={`hover:text-pink-600 ${
                    pathname === item.href ? 'text-pink-600' : ''
                  }`}
                >
                  <span>{item.labelUk}</span>
                  <br />
                  <span>{item.labelEn}</span>
                </Link>
              </li>
            ))}
            <li className="flex justify-center items-center">
              <Link href="/" className="group">
                <svg
                  className="h-20 fill-fuchsia-800 transition-colors duration-200 group-hover:fill-pink-600"
                  viewBox="0 0 100 150"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <use href="/symbols.svg#icon-exit" />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Мобильный бургер */}
        <button
          className="sm:hidden absolute mx-auto top-5 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="hover:drop-shadow-[3px_3px_3px_black] w-24 h-16">
              <use href="/symbols.svg#icon-IconX"></use>
            </svg>
          ) : (
            <svg className="hover:drop-shadow-[3px_3px_3px_black]  w-24 h-16">
              <use href="/symbols.svg#icon-IconMenu"></use>
            </svg>
          )}
        </button>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-lg z-[999] text-center">
          <ul className="flex flex-col gap-4 p-4 text-fuchsia-800 text-xl font-bold">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`hover:text-pink-600 ${
                    pathname === item.href ? 'text-pink-600' : ''
                  }`}
                >
                  {item.labelUk} / {item.labelEn}
                </Link>
              </li>
            ))}
            <li className="flex justify-center">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="group"
              >
                <svg
                  className="w-10 h-10 fill-fuchsia-800 transition-colors duration-200 group-hover:fill-pink-600"
                  viewBox="0 0 100 150"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <use href="/symbols.svg#icon-exit" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
