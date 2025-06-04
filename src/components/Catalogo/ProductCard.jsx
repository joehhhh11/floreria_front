import { Link } from 'react-router-dom'
const ProductCard = ({ product, isFeatured }) => {
  return (
     <Link to={`/producto/${product.id}`} className={`block ${
      isFeatured ? 'md:col-span-2 md:row-span-2' : ''
    }`}>
    <div
      className={`  rounded-lg p-4  transition cursor-pointer
        ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}`}
      style={{
        gridColumn: isFeatured ? 'span 2' : 'span 1',
        gridRow: isFeatured ? 'span 2' : 'span 1',
        height: isFeatured ? '900px' : '45vh',
      }}
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className={`w-full object-cover transition ${
          isFeatured ? 'h-full' : 'h-full'
        }`}
        style={{background:"black", height: isFeatured ? '90%' : '80%' }}
      />
      <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold ">{product.name}</h2>

      <p className="text-sm text-gray-600">${product.price}</p>
      </div>
    </div>
    </Link>
  )
}

export default ProductCard
