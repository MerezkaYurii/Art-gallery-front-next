const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : process.env.NEXT_PUBLIC_BACKEND_API_URL;

if (!API_URL) {
  throw new Error('API_URL is undefined.');
}

export const getArtCatalog = async (page = 1, perPage = 8) => {
  const res = await fetch(
    `${API_URL}/catalog?page=${page}&perPage=${perPage}&sortBy=createdAt&sortOrder=desc`,
    {
      method: 'GET',
      next: { revalidate: 0 },
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Ошибка от сервера:', res.status, errorText);
    throw new Error(`Ошибка загрузки данных `);
  }

  const json = await res.json();

  if (!json.data || !Array.isArray(json.data.data)) {
    return {
      data: [],
      page: 1,
      perPage: 8,
      totalItems: 0,
      totalPages: 0,
    };
  }

  return json.data;
};

//!!!!!!!!!!!!
export const getArtCatalogById = async (id: string) => {
  const res = await fetch(`${API_URL}/catalog/${id}`, {
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
