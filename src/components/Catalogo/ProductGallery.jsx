
import React, { useState } from 'react'
const ProductGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images?.[0] || '')

  return (
    <div className="flex md:flex-row flex-col-reverse gap-5 justify-center pb-5">
      <div className="flex md:flex-col gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index + 1}`}
            onClick={() => setMainImage(img)}
            className={`md:w-42 md:h-60 w-36 h-32 object-cover rounded cursor-pointer border-2 bg-black ${
              mainImage === img ? 'border-blue-500' : 'border-transparent'
            }`}
          />
        ))}
      </div>
      <img
        src={mainImage}
        alt="Imagen principal"
        className="md:w-[600px] md:h-[600px] w-[300px] h-[300px] object-cover rounded-lg mb-4 bg-red-400 mr-5"
      />
    </div>
  )
}

export default ProductGallery