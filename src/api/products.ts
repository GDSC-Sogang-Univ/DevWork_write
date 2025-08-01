import { apiClient } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type {
  CreateProductRequest,
  CreateProductResponse,
} from "@/pages/Form/types/product";

/**
 * Product 관련 API 함수들 (기존 Form에서 사용하던 로직을 공통 API 클라이언트로 리팩토링)
 */

// 상품 생성
export const createProduct = async (
  data: CreateProductRequest
): Promise<CreateProductResponse> => {
  // FormData 생성 (이미지 업로드를 위해)
  const formData = new FormData();

  // 이미지를 제외한 데이터 추가
  Object.entries(data).forEach(([key, value]) => {
    if (key !== "images" && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  // 이미지 추가
  data.images.forEach(image => {
    formData.append("images", image);
  });

  // 실제 API 호출 시 사용
  // return apiClient.post<CreateProductResponse>(API_ENDPOINTS.products.create, formData);

  // Mock response for development (기존 로직 유지)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: "mock-id-" + Date.now(),
        success: true,
        message: "상품이 성공적으로 등록되었습니다.",
      });
    }, 1000);
  });
};

// 상품 목록 조회 (향후 필요 시 사용)
export const getProducts = async (
  params: {
    page?: number;
    limit?: number;
    category?: string;
    userId?: string;
  } = {}
) => {
  const { page = 1, limit = 20, category, userId } = params;

  const searchParams: Record<string, string | number> = {
    page,
    limit,
  };

  if (category) searchParams.category = category;
  if (userId) searchParams.userId = userId;

  return apiClient.get(API_ENDPOINTS.products.list, searchParams);
};

// 상품 상세 조회 (향후 필요 시 사용)
export const getProduct = async (id: string) => {
  return apiClient.get(API_ENDPOINTS.products.detail(id));
};

// 상품 업데이트 (향후 필요 시 사용)
export const updateProduct = async (
  id: string,
  data: Partial<CreateProductRequest>
) => {
  // 이미지가 포함된 경우 FormData 사용
  if (data.images && data.images.length > 0) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "images" && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    data.images.forEach(image => {
      formData.append("images", image);
    });

    return apiClient.put(API_ENDPOINTS.products.update(id), formData);
  } else {
    return apiClient.put(API_ENDPOINTS.products.update(id), data);
  }
};

// 상품 삭제 (향후 필요 시 사용)
export const deleteProduct = async (id: string) => {
  return apiClient.delete(API_ENDPOINTS.products.delete(id));
};
