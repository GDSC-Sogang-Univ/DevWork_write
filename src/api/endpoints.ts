/**
 * API 엔드포인트 상수 정의
 */

export const API_ENDPOINTS = {
  // Article 관련 엔드포인트
  articles: {
    list: "/api/articles",
    detail: (id: string) => `/api/articles/${id}`,
    create: "/api/articles",
    update: (id: string) => `/api/articles/${id}`,
    delete: (id: string) => `/api/articles/${id}`,
  },

  // Product 관련 엔드포인트
  products: {
    list: "/api/products",
    detail: (id: string) => `/api/products/${id}`,
    create: "/api/products",
    update: (id: string) => `/api/products/${id}`,
    delete: (id: string) => `/api/products/${id}`,
  },

  // 카테고리 관련 엔드포인트
  categories: {
    list: "/api/categories",
  },

  // 이미지 업로드 관련 엔드포인트
  upload: {
    images: "/api/upload/images",
  },
} as const;

// 쿼리 키 상수 (React Query용)
export const QUERY_KEYS = {
  articles: {
    all: ["articles"] as const,
    lists: () => [...QUERY_KEYS.articles.all, "list"] as const,
    list: (params: Record<string, any>) =>
      [...QUERY_KEYS.articles.lists(), params] as const,
    details: () => [...QUERY_KEYS.articles.all, "detail"] as const,
    detail: (id: string) => [...QUERY_KEYS.articles.details(), id] as const,
  },

  products: {
    all: ["products"] as const,
    lists: () => [...QUERY_KEYS.products.all, "list"] as const,
    list: (params: Record<string, any>) =>
      [...QUERY_KEYS.products.lists(), params] as const,
    details: () => [...QUERY_KEYS.products.all, "detail"] as const,
    detail: (id: string) => [...QUERY_KEYS.products.details(), id] as const,
  },

  categories: {
    all: ["categories"] as const,
    list: () => [...QUERY_KEYS.categories.all, "list"] as const,
  },
} as const;
