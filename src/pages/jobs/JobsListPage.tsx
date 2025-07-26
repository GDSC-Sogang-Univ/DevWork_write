import { AppScreen, cssVars } from "@stackflow/plugin-basic-ui";
import AsyncBoundary from "../../components/AsyncBoundary";
import { styled } from "@linaria/react";
import FeedCard from "./components/FeedCard";
import {
  PosAbsFull,
  FlexColumn,
  RootLineHeight,
  Flex,
  FlexAlignCenter,
  Flex1,
  OverflowScroll,
  FlexJustifyCenter,
} from "../../styles/f";
import { useJobArticles } from "../../api/hooks/useGetJobArticles";
import { useFlow } from "../../lib/stackflow";

export const JobsListPage = () => {
  const { push } = useFlow();

  return (
    <AsyncBoundary loadingText="매물 목록을 불러오는 중...">
      <AppScreen
        appBar={{
          title: "Jobs",
        }}
      >
        <JobsList />
        <FloatingButton onClick={() => push("JobCreatePage", {})}>
          + 매물 등록
        </FloatingButton>
      </AppScreen>
    </AsyncBoundary>
  );
};

export const JobsList = () => {
  const { data, isEmpty } = useJobArticles();

  if (isEmpty) {
    return (
      <EmptyWrapper>
        <EmptyText>아직 등록된 매물이 없습니다.</EmptyText>
      </EmptyWrapper>
    );
  }

  return (
    <Wrapper>
      <Scrollable>
        {data.map((card) => (
          <FeedCard
            key={card.articleId}
            articleId={String(card.articleId)}
            title={card.title}
            price={card.price}
            region={card.region}
            daysAgo={card.daysAgo}
          />
        ))}
      </Scrollable>
    </Wrapper>
  );
};
export const Wrapper = styled(PosAbsFull)`
  ${FlexColumn}
  ${RootLineHeight}
`;

export const AppBarLeft = styled(Flex)`
  font-size: 1.125rem;
  font-weight: 700;
  margin-left: 0.5rem;
`;

export const AppBarLeftIcon = styled(FlexAlignCenter)`
  margin-left: 0.5rem;
`;

export const AppBarRight = styled.div`
  display: grid;
  grid-template-columns: 1.5rem 1.5rem 1.5rem;
  gap: 1rem;
  margin-right: 0.5rem;
`;

export const Scrollable = styled(Flex1)`
  ${OverflowScroll}
  padding-top: ${cssVars.appBar.height};
  padding-bottom: 80px;
  @supports (padding-top: constant(safe-area-inset-top)) {
    padding-top: calc(${cssVars.appBar.height} + constant(safe-area-inset-top));
  }
  @supports (padding-top: env(safe-area-inset-top)) {
    padding-top: calc(${cssVars.appBar.height} + env(safe-area-inset-top));
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px 24px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s;
  z-index: 100;

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EmptyWrapper = styled.div`
  ${FlexColumn}
  ${FlexAlignCenter}
  ${FlexJustifyCenter}
  ${Flex1}
  padding: 20px;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
`;
