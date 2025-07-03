import { useEffect, useMemo, useState } from "react";
import productService from "@/service/productService";

export const useRelatedProducts = (currentProductId, category) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setAllProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

  const related = useMemo(() => {
    if (!category) return [];
    return allProducts
      .filter(
        (p) => p.categoria?.nombre === category && String(p.id) !== String(currentProductId)
      )
      .slice(0, 4);
  }, [allProducts, currentProductId, category]);

  return related;
};
