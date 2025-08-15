const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : process.env.NEXT_PUBLIC_BACKEND_API_URL;

if (!API_URL) {
  throw new Error('API_URL is undefined.');
}

export const getArtCatalog = async () => {
  const res = await fetch(`${API_URL}/api/catalog`, {
    method: 'GET',
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Ошибка от сервера:', res.status, errorText);
    throw new Error(`Ошибка загрузки данных `);
  }

  const json = await res.json();

  if (!Array.isArray(json.data)) {
    console.error('❌ ОШИБКА: Ожидался массив, но получено:', json.data);
    return [];
  }

  // return json.data;
  return Array.isArray(json.data) ? json.data : [json.data];
};

export const getArtCatalogById = async (id: string) => {
  const res = await fetch(`${API_URL}/api/catalog/${id}`, {
    method: 'GET',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Ошибка от сервера:', res.status, errorText);
    throw new Error(`Ошибка загрузки элемента с id ${id} из категории`);
  }

  const json = await res.json();
  return json.data;
};
