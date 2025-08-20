'use client';

import Image from 'next/image';
import Link from 'next/link';

import React, { useEffect, useState } from 'react';
import { getArtCatalog } from '../api/api';

export type CatalogItem = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
};

// type CatalogPageProps = {
//   items: {
//     data: CatalogItem[];
//     page: number;
//     perPage: number;
//     totalItems: number;
//     totalPages: number;
//   };
// };
const PER_PAGE = 8;
export default function CatalogPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadPage = async (pageToLoad: number) => {
    setLoading(true);
    try {
      const res = await getArtCatalog(pageToLoad, PER_PAGE);
      setItems((prev) => [...prev, ...res.data]);
      setPage(res.page);
      setHasNextPage(res.hasNextPage); // получено с бэка
    } catch (err) {
      console.error('Ошибка загрузки каталога:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(1); // Первая загрузка
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasNextPage) {
      loadPage(page + 1);
    }
  };

  // const visibleData = items.data.slice(0, visibleItems);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12  bg-gray-300">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
        {items.map((item) => (
          <Link href={`/catalog/${item._id}`} key={item._id}>
            <div
              key={item._id}
              className="w-[300px] h-[600px] overflow-hidden rounded-xl shadow-md  bg-gray-800 "
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={300}
                height={500}
                className="w-full h-[500px] object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl text-gray-200 font-bold mb-2">
                  {item.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Кнопка загрузки, только если есть ещё элементы */}
      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-blue-800 text-white font-bold px-6 py-2 rounded-xl hover:bg-gray-700 transition"
          >
            {loading
              ? 'Завантаження/Loading...'
              : 'Завантажити більше / Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
