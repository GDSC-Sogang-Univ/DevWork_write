import { useQuery } from "@tanstack/react-query";
import { getMockCarouselData } from "@/api/carousel";
import { QUERY_KEYS } from "@/api/endpoints";
import type { CarouselItem } from "@/types/carousel";

export const useCarousel = () => {
  return useQuery<CarouselItem[]>({
    queryKey: QUERY_KEYS.carousel.list(),
    queryFn: getMockCarouselData, // 실제 API가 준비되면 getCarouselData로 변경
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 2,
    retryDelay: 1000,
  });
};
