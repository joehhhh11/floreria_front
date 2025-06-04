import { useMemo } from "react";
import { getAllProducts } from "@/service/productService";

export const useRelatedProducts = (currentProductId, category) => {
  const allProducts = getAllProducts();

  return useMemo(() => {
    return allProducts
      .filter(p => p.category === category && String(p.id) !== String(currentProductId))
      .slice(0, 4); // puedes ajustar el número que quieras mostrar
  }, [currentProductId, category]);
};
