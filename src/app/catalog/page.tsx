import React from 'react';
import { getArtCatalog } from '~/app/api/api';
import CatalogPage from '../components/CatalogPage';

export default async function ArtCatalogPage() {
  const items = await getArtCatalog();

  return <CatalogPage items={items} />;
}
