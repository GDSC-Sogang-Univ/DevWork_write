import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import CarouselCard component
import CarouselCard from "./CarouselCard";

// Import types
import type { CarouselItem } from "@/types/carousel";

// Mock 데이터
const mockCarouselData: CarouselItem[] = [
  {
    id: 1,
    icon: "📚",
    title: "매 학기 전공 서적은 서강마켓에서!",
    description: "필요한 교재부터 베스트셀러 도서까지",
  },
  {
    id: 2,
    icon: "💻",
    title: "학업 필수 전자기기",
    description: "인기 기기부터 실속 아이템까지 한눈에",
  },
  {
    id: 3,
    icon: "👔",
    title: "개강맞이 패션 아이템",
    description: "트렌디한 의류와 악세서리",
  },
];

interface CarouselProps {
  className?: string;
  data?: CarouselItem[];
}

export const Carousel: React.FC<CarouselProps> = ({
  className,
  data = mockCarouselData,
}) => {
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
          bulletClass: "swiper-pagination-bullet",
        }}
        navigation={false}
        modules={[Pagination, Navigation, Autoplay]}
        className="carousel-swiper"
        style={
          {
            "--swiper-pagination-color": "var(--color-sogang-gray-light)",
            // 선택되지 않은 페이지네이션 컬러 지정
            "--swiper-pagination-bullet-inactive-color":
              "var(--color-sogang-gray-light)",
            "--swiper-pagination-bullet-inactive-opacity": "0.3",
          } as React.CSSProperties
        }
      >
        {data.map(slide => (
          <SwiperSlide key={slide.id}>
            <CarouselCard
              id={slide.id}
              icon={slide.icon}
              title={slide.title}
              description={slide.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
