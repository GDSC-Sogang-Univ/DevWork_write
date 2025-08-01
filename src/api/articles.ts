import { api } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type {
  Article,
  ArticleListParams,
  ArticleListResponse,
  ArticleDetailResponse,
  CreateArticleRequest,
  CreateArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
  DeleteArticleResponse,
} from "@/types/article";

/**
 * Article 관련 API 함수들
 */

// 게시글 목록 조회
export const getArticles = async (
  params: ArticleListParams = {}
): Promise<ArticleListResponse> => {
  const {
    page = 1,
    limit = 20,
    query,
    category,
    location,
    status,
    sortBy = "latest",
    minPrice,
    maxPrice,
  } = params;

  const searchParams: Record<string, string | number> = {
    page,
    limit,
    sortBy,
  };

  // 선택적 파라미터들 추가
  if (query) searchParams.query = query;
  if (category) searchParams.category = category;
  if (location) searchParams.location = location;
  if (status) searchParams.status = status;
  if (minPrice !== undefined) searchParams.minPrice = minPrice;
  if (maxPrice !== undefined) searchParams.maxPrice = maxPrice;

  return api.get<ArticleListResponse>(
    API_ENDPOINTS.articles.list,
    searchParams
  );
};

// 게시글 상세 조회
export const getArticle = async (
  id: string
): Promise<ArticleDetailResponse> => {
  return api.get<ArticleDetailResponse>(API_ENDPOINTS.articles.detail(id));
};

// 게시글 생성
export const createArticle = async (
  data: CreateArticleRequest
): Promise<CreateArticleResponse> => {
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

  return api.post<CreateArticleResponse>(
    API_ENDPOINTS.articles.create,
    formData
  );
};

// 게시글 업데이트
export const updateArticle = async (
  id: string,
  data: UpdateArticleRequest
): Promise<UpdateArticleResponse> => {
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

    return api.put<UpdateArticleResponse>(
      API_ENDPOINTS.articles.update(id),
      formData
    );
  } else {
    // 이미지가 없는 경우 JSON 사용
    return api.put<UpdateArticleResponse>(
      API_ENDPOINTS.articles.update(id),
      data
    );
  }
};

// 게시글 삭제
export const deleteArticle = async (
  id: string
): Promise<DeleteArticleResponse> => {
  return api.delete<DeleteArticleResponse>(API_ENDPOINTS.articles.delete(id));
};

// Mock 데이터 (개발용)
export const getMockArticles = async (
  params: ArticleListParams = {}
): Promise<ArticleListResponse> => {
  // 실제 API 대신 Mock 데이터 반환 (개발용)
  const mockArticles: Article[] = [
    {
      id: "1",
      title: "미적분학 교재 (새 책)",
      price: 25000,
      location: "서강대앞",
      imageUrl: undefined,
      likeCount: 12,
      chatCount: 3,
      status: "active",
      category: "도서/티켓",
      description: "미적분학 교재입니다. 거의 새 책 상태예요.",
      userId: "user1",
      userName: "익명",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "아이폰 14 126GB 블랙",
      price: 850000,
      location: "도서관 앞",
      imageUrl: undefined,
      likeCount: 45,
      chatCount: 12,
      status: "active",
      category: "전자기기",
      description: "아이폰 14 126GB 블랙 색상입니다.",
      userId: "user2",
      userName: "익명",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        items: mockArticles,
        pagination: {
          current: params.page || 1,
          total: mockArticles.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      });
    }, 500); // 0.5초 지연으로 로딩 상태 시뮬레이션
  });
};
