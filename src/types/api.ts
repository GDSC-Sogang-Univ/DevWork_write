/**
 * 공통 API 관련 타입 정의
 */

// 공통 응답 형태
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// 에러 응답 형태
export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: {
    code: string;
    details?: any;
  };
}

// 페이지네이션 관련 타입
export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginationMeta {
  current: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

// 검색 및 필터링 관련 타입
export interface SearchParams {
  query?: string;
  category?: string;
  location?: string;
  status?: string;
}

// API 요청 상태
export type ApiStatus = "idle" | "loading" | "success" | "error";

// 공통 엔티티 필드
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
