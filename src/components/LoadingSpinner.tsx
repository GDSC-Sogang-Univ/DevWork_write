import { styled } from '@linaria/react';
import { FlexAlignCenter, FlexJustifyCenter } from '../styles/f';

const SpinnerWrapper = styled.div`
  display: flex;
  ${FlexAlignCenter}
  ${FlexJustifyCenter}
  width: 100%;
  height: 100%;
  min-height: 200px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
`;

interface LoadingSpinnerProps {
  text?: string;
}

export const LoadingSpinner = ({ text = '로딩 중...' }: LoadingSpinnerProps) => {
  return (
    <SpinnerWrapper>
      <div>
        <Spinner />
        <LoadingText>{text}</LoadingText>
      </div>
    </SpinnerWrapper>
  );
};