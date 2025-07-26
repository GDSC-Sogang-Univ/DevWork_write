import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchInstance } from "../instance";
import { AxiosResponse } from "axios";
import { JobArticle } from "../../types/api";
import { useApiError } from "../../hooks/useApiError";

export const JOB_ARTICLES_URL = "group-job-articles";

export type JobArticlesResponse = JobArticle[];

export const getJobArticles = async (): Promise<JobArticlesResponse> => {
  const { data } = await fetchInstance().get<
    undefined,
    AxiosResponse<JobArticlesResponse>
  >(JOB_ARTICLES_URL);

  return data;
};

interface UseJobArticlesOptions {
  onError?: (error: unknown) => void;
  enabled?: boolean;
}

export const useJobArticles = (options?: UseJobArticlesOptions) => {
  const queryOptions: UseQueryOptions<JobArticlesResponse, unknown> = {
    queryKey: ["jobArticles"],
    queryFn: getJobArticles,
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  };

  const { isPending, error, data, isFetching, refetch } = useQuery(queryOptions);

  // 에러 처리
  useApiError(error, options?.onError as any);

  return { 
    data: data ?? [], 
    isPending, 
    error, 
    isFetching,
    refetch,
    isEmpty: !isPending && (!data || data.length === 0)
  };
};
