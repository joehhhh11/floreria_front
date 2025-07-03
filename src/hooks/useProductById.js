import { useEffect, useState } from 'react'
import productService from '@/service/productService'

export function useProductById(id) {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await productService.getProductById(id)
        setProduct(data)
        console.log('Product fetched:', data)
      } catch (e) {
        console.error(e)
      }
    }

    fetch()
  }, [id])

  return product
}

