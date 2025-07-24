import React, { useState } from 'react';

const ProductGallery = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(images[0] || '');
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const resolveImageUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') || url.startsWith('/')
      ? url
      : BASE_URL + url;
  };

  console.log('ProductGallery images:', images);

  return (
    <div className="flex md:flex-row flex-col-reverse gap-5 justify-center pb-5">
      <div className="flex md:flex-col gap-2">
        {images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={index}
              src={resolveImageUrl(img)}
              alt={`Miniatura ${index + 1}`}
              onClick={() => setMainImage(img)}
              className={`md:w-42 md:h-60 w-36 h-32 object-cover rounded cursor-pointer border-2 bg-black ${
                mainImage === img ? 'border-blue-500' : 'border-transparent'
              }`}
            />
          ))
        ) : (
          <div className="md:w-42 md:h-60 w-36 h-32 bg-black rounded flex items-center justify-center text-white text-sm">
            Sin imágenes
          </div>
        )}
      </div>

      {mainImage ? (
        <img
          src={resolveImageUrl(mainImage)}
          alt="Imagen principal"
          className="md:w-[600px] md:h-[600px] w-[300px] h-[300px] object-cover rounded-lg mb-4 bg-black mr-5"
        />
      ) : (
        <div className="md:w-[600px] md:h-[600px] w-[300px] h-[300px] bg-black rounded-lg mb-4 mr-5 flex items-center justify-center text-white text-xl">
          Sin imagen
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
