import React from 'react';
import { getArtCatalog } from '~/app/api/api';
import CatalogPage from '~/app/components/CatalogPage';

export default async function PhotoGalleryPage() {
  const items = await getArtCatalog();

  return <CatalogPage items={items} />;
}
