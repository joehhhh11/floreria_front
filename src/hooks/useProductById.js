import { getAllProducts } from '@/service/productService'

export function useProductById(id) {
  const products = getAllProducts()
  const product = products.find(p => String(p.id) === id)
  return product
}