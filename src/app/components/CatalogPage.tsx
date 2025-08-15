'use client';

import Image from 'next/image';
import Link from 'next/link';

import React, { useState } from 'react';

export type CatalogItem = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
};

type CatalogPageProps = {
  items: CatalogItem[];
};

export default function CatalogPage({ items }: CatalogPageProps) {
  const [visibleItems, setVisibleItems] = useState(6); // 👈 показываем 6 сначала

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 6); // 👈 шаг загрузки — 6
  };

  const visibleData = items.slice(0, visibleItems);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {visibleData.map((item) => (
          <Link href={`/catalog/${item._id}`} key={item._id}>
            <div key={item._id}>
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl text-gray-300 font-bold mb-2">
                  {item.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Кнопка загрузки, только если есть ещё элементы */}
      {visibleItems < items.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-blue-800 text-white font-bold px-6 py-2 rounded-xl hover:bg-gray-700 transition"
          >
            Завантажити більше/Load More
          </button>
        </div>
      )}
    </div>
  );
}
