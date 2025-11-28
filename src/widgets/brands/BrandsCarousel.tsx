"use client";

import React from 'react';

const BrandsCarousel: React.FC = () => {
  const brands = [
    'Calvin Klein',
    'DIOR',
    'MONTBLANC',
    'rabanne',
    'GUCCI',
    'CAROLINA HERRERA',
    'CHANEL',
    'Versace',
    'Prada',
    'Armani',
    'Yves Saint Laurent',
    'Dolce & Gabbana',
  ];

  return (
    <div className="w-full bg-white py-4 overflow-hidden border-y border-gray-200">
      <div className="relative flex">
        {/* Duplicamos el array para el efecto infinito */}
        <div className="flex animate-scroll">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-8 flex items-center justify-center"
              style={{ minWidth: '200px' }}
            >
              <span className="text-lg font-light tracking-wider text-gray-700 whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default BrandsCarousel;
