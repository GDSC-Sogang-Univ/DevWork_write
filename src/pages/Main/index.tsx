import { AppScreen } from "@stackflow/plugin-basic-ui";
import { Header } from "@/components";
import { ProductList } from "./components/ProductList";
import { useArticles } from "@/hooks/useArticles";
import { LoadingIndicator } from "seed-design/ui/loading-indicator";
import { IconFaceSurprisedCircleLine } from "@karrotmarket/react-monochrome-icon";

const Main = () => {
  const { data: articles, isLoading } = useArticles();

  if (isLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return (
    <AppScreen>
      <Header route="main" />
      {articles ? (
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
