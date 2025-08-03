import { AppScreen } from "@stackflow/plugin-basic-ui";
import { Header } from "@/components";
import { ProductList } from "./components/ProductList";
import { useArticles } from "@/hooks/useArticles";
import { IconFaceSurprisedCircleLine } from "@karrotmarket/react-monochrome-icon";
import { ProgressCircle } from "seed-design/ui/progress-circle";
import PromotionalBanner from "@/components/PromotionalBanner";
import ProductRegisterButton from "./components/ProductRegister";
import { useFlow } from "@stackflow/react/future";

const Main = () => {
  const { data: articles, isLoading } = useArticles();
  const { push } = useFlow();

  const handleProductRegisterClick = () => {
    push("form", {});
  };

  return (
    <AppScreen>
      <Header route="main" />
      <div className="px-4 py-2">
        <PromotionalBanner />
      </div>

      <ProductRegisterButton onClick={handleProductRegisterClick} />

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
    </AppScreen>
  );
};

export default Main;
