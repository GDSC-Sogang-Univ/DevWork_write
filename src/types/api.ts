// API 응답 타입 정의
export interface JobArticle {
  articleId: number;
  title: string;
  price: number;
  region: string;
  daysAgo: number;
  imageUrl?: string;
  description?: string;
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobArticleDetail extends JobArticle {
  content: string;
  author: {
    id: string;
    name: string;
    profileImage?: string;
  };
  viewCount: number;
  likeCount: number;
  isLiked?: boolean;
}

// API 응답 래퍼 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

// 페이지네이션 타입
export interface PaginationParams {
  page: number;
  size: number;
  sort?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}