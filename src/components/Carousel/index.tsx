import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import custom styles
import "./styles.css";

// Mock 데이터
const mockCarouselData = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    title: "새로운 상품을 만나보세요",
    description: "다양한 상품들을 둘러보세요",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop",
    title: "특별한 할인 혜택",
    description: "지금 바로 확인하세요",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    title: "인기 상품 모음",
    description: "사람들이 많이 찾는 상품들",
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop",
    title: "신상품 출시",
    description: "새롭게 출시된 상품들을 만나보세요",
  },
  {
    id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    title: "추천 상품",
    description: "개인화된 추천 상품을 확인하세요",
  },
];

interface CarouselProps {
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({ className }) => {
  return (
    <div className={`w-full ${className}`}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveColor: "#b11f15", // sogang-700
          bulletClass: "swiper-pagination-bullet",
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="carousel-swiper"
        style={
          {
            "--swiper-navigation-color": "#b11f15",
            "--swiper-pagination-color": "#b11f15",
          } as React.CSSProperties
        }
      >
        {mockCarouselData.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-48 md:h-64 lg:h-80">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-sm opacity-90">{slide.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
