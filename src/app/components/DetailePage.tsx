import Image from 'next/image';
import { getArtCatalogById } from '~/app/api/api';

type DetailPageProps = {
  params: { id: string };
};

export default async function DetailPage({ params }: DetailPageProps) {
  const item = await getArtCatalogById(params.id);

  if (!item) {
    return <div className="text-center text-red-600">Item not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="rounded overflow-hidden shadow-lg">
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={800}
          className="w-full object-contain"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {item.title}
          </h1>
          <p className="text-lg text-gray-700">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
