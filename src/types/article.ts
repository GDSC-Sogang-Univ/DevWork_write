import type {
  BaseEntity,
  PaginatedResponse,
  SearchParams,
  PaginationParams,
} from "./api";

/**
 * Article 관련 타입 정의 (메인 페이지용)
 */

// 상품/게시글 상태
export type ArticleStatus = "active" | "reserved" | "sold";

// 게시글 기본 정보
export interface Article extends BaseEntity {
  title: string;
  price: number;
  location: string;
  imageUrl?: string;
  likeCount: number;
  chatCount: number;
  status: ArticleStatus;
  category: string;
  description?: string;
  userId: string;
  userName?: string;
}

// 게시글 목록 조회 요청 파라미터
export interface ArticleListParams extends PaginationParams, SearchParams {
  sortBy?: "latest" | "price_asc" | "price_desc" | "popular";
  minPrice?: number;
  maxPrice?: number;
}

// 게시글 목록 응답
export type ArticleListResponse = PaginatedResponse<Article>;

// 게시글 상세 조회 응답
export interface ArticleDetailResponse {
  article: Article;
  relatedArticles?: Article[];
}

// 게시글 생성 요청 (Form에서 사용하던 타입과 유사)
export interface CreateArticleRequest {
  title: string;
  category: string;
  price: number;
  priceNegotiable: boolean;
  description: string;
  location: string;
  images: File[];
  status?: ArticleStatus;
}

// 게시글 생성 응답
export interface CreateArticleResponse {
  id: string;
  success: boolean;
  message: string;
}

// 게시글 업데이트 요청
export interface UpdateArticleRequest extends Partial<CreateArticleRequest> {
  status?: ArticleStatus;
}

// 게시글 업데이트 응답
export interface UpdateArticleResponse {
  success: boolean;
  message: string;
}

// 게시글 삭제 응답
export interface DeleteArticleResponse {
  success: boolean;
  message: string;
}
