import ProductCard from "./ProductCard";

const RelatedProducts = ({ products }) => {
  return (
    <div className="mt-16 w-[80vw] mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Productos relacionados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
