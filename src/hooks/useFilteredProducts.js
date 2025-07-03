import { useMemo } from 'react'

export function useFilteredProducts(products, filters) {
  const { category, priceOrder, ratingOrder, currentPage = 1, perPage = 8 } = filters

const filtered = useMemo(() => {
  if (!Array.isArray(products)) return [];

  let result = category
  ? products.filter(p => p.categoria?.id === Number(category))
  : [...products];

  result.sort((a, b) => {
    if (ratingOrder === 'asc') return a.rating - b.rating;
    if (ratingOrder === 'desc') return b.rating - a.rating;
    if (priceOrder === 'asc') return a.price - b.price;
    if (priceOrder === 'desc') return b.price - a.price;
    return 0;
  });

  return result;
}, [products, category, priceOrder, ratingOrder]);

  const totalPages = Math.ceil(filtered.length / perPage)

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage
    const end = start + perPage
    return filtered.slice(start, end)
  }, [filtered, currentPage, perPage])

  return { paginated, totalPages }
}
