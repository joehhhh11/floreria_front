import ProductCard from "./ProductCard";

const RelatedProducts = ({ products }) => {
  return (
    <div className="mt-16 w-[80vw] mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Productos relacionados</h2>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8 border rounded-xl">
          <p>No hay productos relacionados.</p>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
