import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getMockArticles,
} from "@/api/articles";
import { QUERY_KEYS } from "@/api/endpoints";
import type { ArticleListParams, UpdateArticleRequest } from "@/types/article";

/**
 * Article 관련 React Query 훅들
 */

// 게시글 목록 조회 훅
export const useArticles = (params: ArticleListParams = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.articles.list(params),
    queryFn: () => getMockArticles(params), // 개발용 Mock 데이터 사용
    // queryFn: () => getArticles(params), // 실제 API 사용 시
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 2,
  });
};

// 게시글 상세 조회 훅
export const useArticle = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.articles.detail(id),
    queryFn: () => getArticle(id),
    enabled: !!id, // id가 있을 때만 실행
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

// 게시글 생성 뮤테이션 훅
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.articles.lists(),
      });
    },
    onError: error => {
      console.error("게시글 생성 실패:", error);
    },
  });
};

// 게시글 업데이트 뮤테이션 훅
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateArticleRequest }) =>
      updateArticle(id, data),
    onSuccess: (_, { id }) => {
      // 특정 게시글 상세 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.articles.detail(id),
      });
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.articles.lists(),
      });
    },
    onError: error => {
      console.error("게시글 업데이트 실패:", error);
    },
  });
};

// 게시글 삭제 뮤테이션 훅
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: (_, id) => {
      // 특정 게시글 상세 캐시 제거
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.articles.detail(id),
      });
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.articles.lists(),
      });
    },
    onError: error => {
      console.error("게시글 삭제 실패:", error);
    },
  });
};

// 무한 스크롤을 위한 useInfiniteQuery 훅
export const useInfiniteArticles = (
  params: Omit<ArticleListParams, "page"> = {}
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.articles.list({ ...params, infinite: true }),
    queryFn: ({ pageParam = 1 }) =>
      getMockArticles({ ...params, page: pageParam as number }),
    // queryFn: ({ pageParam = 1 }) =>
    //   getArticles({ ...params, page: pageParam as number }), // 실제 API 사용 시
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    getNextPageParam: (lastPage: any) => {
      return lastPage.pagination.hasNext
        ? lastPage.pagination.current + 1
        : undefined;
    },
  });
};
