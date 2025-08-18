'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getArtCatalogById } from '~/app/api/api';

import DetailPage from '~/app/components/DetailePage';
import Loader from '~/app/components/Loader';

export default function ArtCatalogDetailPage() {
  const { id } = useParams() as { id: string };

  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || id === 'undefined') {
      setError('ID не передан в URL');
      return;
    }

    getArtCatalogById(id)
      .then((data) => setItem(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-center text-white">{error}</p>;
  if (!item)
    return (
      <div className="mx-auto">
        <Loader />
      </div>
    );

  return <DetailPage item={item} />;
}
