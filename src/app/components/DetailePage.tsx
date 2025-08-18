import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

type DetailPageProps = {
  item: {
    title: string;
    description: string;
    thumbnail: string;
  };
};

export default function DetailPage({ item }: DetailPageProps) {
  const router = useRouter();
  if (!item) {
    return <div className="text-center text-red-600">Item not found</div>;
  }

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    // Если клик был по самому контейнеру (а не по вложенным элементам)
    if (e.target === e.currentTarget) {
      router.push('/catalog');
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-300 flex justify-center items-center px-4 py-8"
      onClick={handleBackgroundClick}
    >
      <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="relative w-full aspect-[3/4]">
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={800}
            height={1200}
            className="w-full object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="p-6">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-200 mb-2 sm:mb-4">
              {item.title}
            </h1>
            <p className="text-sm sm:text-lg text-gray-200">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
