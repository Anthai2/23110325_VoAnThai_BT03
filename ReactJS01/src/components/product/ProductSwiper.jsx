import React, { useState } from "react";

const ProductSwiper = ({ images = [] }) => {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="w-full">
      <div className="relative w-full h-80 bg-gray-100 rounded-md overflow-hidden">
        <img
          src={images[idx]}
          alt={`img-${idx}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
            >
              ▶
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-2">
          {images.map((im, i) => (
            <img
              key={i}
              src={im}
              alt={i}
              onClick={() => setIdx(i)}
              className={`w-16 h-12 object-cover rounded cursor-pointer border ${i === idx ? "border-accent" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSwiper;
