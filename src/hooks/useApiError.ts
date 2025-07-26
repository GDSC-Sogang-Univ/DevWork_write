import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../api/instance';

export const useApiError = (error: unknown, customHandler?: (error: AxiosError<ErrorResponse>) => void) => {
  useEffect(() => {
    if (!error) return;

    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      
      if (customHandler) {
        customHandler(axiosError);
        return;
      }

      // 기본 에러 처리
      switch (axiosError.response?.status) {
        case 401:
          console.error('인증이 필요합니다.');
          // TODO: 로그인 페이지로 리다이렉트
          break;
        case 403:
          console.error('권한이 없습니다.');
          break;
        case 404:
          console.error('요청한 리소스를 찾을 수 없습니다.');
          break;
        case 500:
          console.error('서버 오류가 발생했습니다.');
          break;
        default:
          console.error(axiosError.response?.data?.message || '알 수 없는 오류가 발생했습니다.');
      }
    }
  }, [error, customHandler]);
};