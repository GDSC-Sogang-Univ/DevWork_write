import { AppScreen } from "@stackflow/plugin-basic-ui";
import { Header } from "@/components";
import { ProductList } from "./components/ProductList";
import { useArticles } from "@/hooks/useArticles";
import {
  IconFaceSurprisedCircleLine,
  IconPlusLine,
} from "@karrotmarket/react-monochrome-icon";
import { ProgressCircle } from "seed-design/ui/progress-circle";
import { useFlow } from "@/lib/stackflow";
import { Icon } from "@seed-design/react";
import FloatingBtn from "@/components/FloatingButton";

const Main = () => {
  const { data: articles, isLoading } = useArticles();
  const { push } = useFlow();

  const handleGoToRegister = () => {
    push("form", {});
  };

  return (
    <AppScreen>
      <Header route="main" />
      {isLoading ? (
        <ProgressCircle tone="neutral" size="40" />
      ) : articles ? (
        <ProductList
          articles={articles.items}
          onClickItem={id => console.log("상품 클릭:", id)}
          onToggleFavorite={id => console.log("찜 토글:", id)}
        />
      ) : (
        <div>
          <IconFaceSurprisedCircleLine />
          목록을 얻어오는데 실패했어요..
        </div>
      )}
      <FloatingBtn onClickFunc={handleGoToRegister}>
        <Icon svg={<IconPlusLine />} />
      </FloatingBtn>
    </AppScreen>
  );
};

export default Main;
