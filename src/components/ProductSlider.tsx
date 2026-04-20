"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string | { url?: string } | null;
  isNew?: boolean;
}

export default function ProductSlider({ products }: { products?: Product[] }) {
  if (!products?.length) return null;

  return (
    <section className="w-full py-[5px] pb-8" data-reveal="fade-in">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={5}
        slidesPerView={1.2}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
          1440: { slidesPerView: 5 },
        }}
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="flex flex-col hover:scale-[1.02] transition-transform duration-300">
              <div className="relative h-[280px] sm:h-[320px] md:h-[396px] overflow-hidden rounded-sm">
                <img
                  src={typeof product.image === 'string' ? product.image : product.image?.url ?? ''}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <span className="absolute top-[10px] left-[10px] bg-morton-red text-white font-[family-name:var(--font-geist)] font-medium text-[12px] tracking-[-0.24px] px-[4px] py-[2px]">
                    NEW
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between bg-gray-200 p-[10px]">
                <span className="font-[family-name:var(--font-geist)] font-medium text-[14px] text-black tracking-[-0.28px]">
                  {product.name}
                </span>
                <span className="font-[family-name:var(--font-geist)] font-medium text-[14px] text-black tracking-[-0.28px] whitespace-nowrap ml-2">
                  €{product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination styles */}
      <style jsx global>{`
        .swiper-pagination {
          position: relative;
          margin-top: 16px;
        }
        .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #d1d1d1;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #000000;
        }
      `}</style>
    </section>
  );
}
