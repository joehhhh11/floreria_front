import { useEffect, useMemo, useState } from "react";
import productService from "@/service/productService";

export const useRelatedProducts = (currentProductId, category) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setAllProducts(data);
        console.log("All products fetched:", data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

const related = useMemo(() => {
  if (!category) return [];

  const filtrados = allProducts.filter(
    (p) =>
      p.categoria?.nombre === category &&
      String(p.id) !== String(currentProductId)
  );

  // Si no hay productos relacionados, mostramos cualquiera menos el actual
  if (filtrados.length === 0) {
    return allProducts
      .filter((p) => String(p.id) !== String(currentProductId))
      .slice(0, 4);
  }

  return filtrados.slice(0, 4);
}, [allProducts, currentProductId, category]);


  return related;
};
