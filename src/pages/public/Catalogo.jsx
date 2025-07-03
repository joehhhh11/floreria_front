import React, { useState, useEffect } from "react";
import productService from "@/service/productService";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import ProductCard from "@/components/Catalogo/ProductCard";
import FilterPanel from "@/components/Catalogo/FilterPanel";
import Pagination from "@/components/Catalogo/Pagination";

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;
  useEffect(() => {
  productService.getAllCategories().then(setCategories).catch(console.error);
}, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = category
          ? await productService.getCategoryProducts(category)
          : await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, [category]);
  const { paginated, totalPages } = useFilteredProducts(products, {
    category,
    priceOrder:
      sortBy === "price-asc" ? "asc" : sortBy === "price-desc" ? "desc" : null,
    ratingOrder:
      sortBy === "rating-asc"
        ? "asc"
        : sortBy === "rating-desc"
        ? "desc"
        : null,
    currentPage,
    perPage,
  });

  return (
    <div className="p-6 md:w-[70vw] mx-auto">
      <FilterPanel
        category={category}
        categories={categories}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 my-8">
        {(paginated || []).map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isFeatured={index === 4}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Catalogo;
