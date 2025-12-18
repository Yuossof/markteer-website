"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Img {
  id?: string;
  url: string;
}

interface ProjectsSwiperProps {
  images: Img[];
}

const ProjectsSwiper: React.FC<ProjectsSwiperProps> = ({ images }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No images available
      </div>
    );
  }

  const enableLoop = images.length > 3;

  return (
    <div className="w-full max-w-[90%] mx-auto py-10 px-4">
      <Swiper
        modules={[Navigation, Pagination]}
        grabCursor
        centeredSlides
        slidesPerView={1}
        spaceBetween={20}
        loop={enableLoop}
        loopAdditionalSlides={images.length}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="projects-swiper"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id ?? index}>
            <div className="relative w-full h-[300px] overflow-hidden rounded-xl shadow-xl transition-all duration-300">
              <div
                className="relative w-full h-full"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 40px) 100%, 0 100%)",
                }}
              >
                <Image
                  src={image.url}
                  alt={`Project Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .projects-swiper {
          padding-bottom: 50px;
        }

        .projects-swiper .swiper-pagination {
          bottom: 10px;
        }

        .projects-swiper .swiper-pagination-bullet {
          background: #4b5563;
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }

        .projects-swiper .swiper-pagination-bullet-active {
          background: #f97316;
          width: 24px;
          border-radius: 4px;
        }

        .projects-swiper .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.5;
          transform: scale(0.9);
          transition: all 0.4s ease;
        }

        .projects-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1.05);
          z-index: 10;
        }

        .projects-swiper .swiper-slide-prev,
        .projects-swiper .swiper-slide-next {
          opacity: 0.7;
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default ProjectsSwiper;
