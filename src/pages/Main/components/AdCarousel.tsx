import Carousel from "@/components/Carousel";
import type { EmblaOptionsType } from "embla-carousel";
import CarouselItem, {
  type CarouselItemType,
} from "@/components/Carousel/CarouselItem";

const OPTIONS: EmblaOptionsType = {};
const carouselData: CarouselItemType[] = [
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

function AdCarousel() {
  return (
    <Carousel
      slides={carouselData.map(item => (
        <CarouselItem key={item.id} {...item} />
      ))}
      options={OPTIONS}
    />
  );
}

export default AdCarousel;
