import { AppScreen } from "@stackflow/plugin-basic-ui";
import { Carousel, Header } from "@/components";
import { ProductList } from "./components/ProductList";
import { useArticles } from "@/hooks/useArticles";
import { IconFaceSurprisedCircleLine } from "@karrotmarket/react-monochrome-icon";
import { ProgressCircle } from "seed-design/ui/progress-circle";

const Main = () => {
  const { data: articles, isLoading } = useArticles();

  return (
    <AppScreen>
      <Header route="main" />
      <Carousel className="mb-6" />
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
