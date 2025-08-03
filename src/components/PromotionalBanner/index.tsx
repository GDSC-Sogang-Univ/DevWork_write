import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/swiper-bundle.css";

interface BannerData {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundColor: string;
  textColor: string;
}

interface PromotionalBannerProps {
  banners?: BannerData[];
  autoplayDelay?: number;
  height?: string;
}

const defaultBanners: BannerData[] = [
  {
    id: "1",
    title: "🔥 Special Deal Today!",
    subtitle: "Upload your product now and sell faster",
    backgroundColor: "bg-sogang-700",
    textColor: "text-white",
  },
  {
    id: "2",
    title: "📦 Free Shipping Event",
    subtitle: "On orders over 50,000 KRW",
    backgroundColor: "bg-blue-600",
    textColor: "text-white",
  },
  {
    id: "3",
    title: "⭐ Top Seller Products",
    subtitle: "Check out what others are buying",
    backgroundColor: "bg-green-600",
    textColor: "text-white",
  },
];

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  banners = defaultBanners,
  autoplayDelay = 3000,
  height = "h-48",
}) => {
  return (
    <div className={`w-full ${height} rounded-lg overflow-hidden`}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet opacity-60 bg-white",
          bulletActiveClass: "swiper-pagination-bullet-active opacity-100",
        }}
        navigation={false}
        className="h-full"
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id}>
            <div
              className={`flex flex-col items-center justify-center h-full px-6 ${banner.backgroundColor} ${banner.textColor}`}
              style={
                banner.backgroundImage
                  ? {
                      backgroundImage: `url(${banner.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <h2 className="text-2xl font-bold mb-2 text-center">
                {banner.title}
              </h2>
              <p className="text-center opacity-90">{banner.subtitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PromotionalBanner;
