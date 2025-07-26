import { styled } from '@linaria/react';
import { FlexColumn, FlexAlignCenter, FlexJustifyCenter } from '../styles/f';
import { ErrorBoundaryProps } from '@sentry/react';

const ErrorWrapper = styled.div`
  ${FlexColumn}
  ${FlexAlignCenter}
  ${FlexJustifyCenter}
  width: 100%;
  height: 100%;
  min-height: 300px;
  padding: 20px;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ErrorTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <ErrorWrapper>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>오류가 발생했습니다</ErrorTitle>
      <ErrorMessage>
        {error.message || '예상치 못한 오류가 발생했습니다. 다시 시도해주세요.'}
      </ErrorMessage>
      <RetryButton onClick={resetErrorBoundary}>다시 시도</RetryButton>
    </ErrorWrapper>
  );
};