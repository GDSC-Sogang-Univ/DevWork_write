import { api } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type { CarouselItem } from "@/types/carousel";

/**
 * Carousel 관련 API 함수들
 */

// 캐러셀 데이터 조회
export const getCarouselData = async (): Promise<CarouselItem[]> => {
  return api.get<CarouselItem[]>(API_ENDPOINTS.carousel.list);
};

// Mock 데이터 (개발용)
export const getMockCarouselData = async (): Promise<CarouselItem[]> => {
  // 실제 API 대신 Mock 데이터 반환 (개발용)
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

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCarouselData);
    }, 500); // 0.5초 지연으로 로딩 상태 시뮬레이션
  });
};
