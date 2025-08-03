import { AppScreen } from "@stackflow/plugin-basic-ui";
import { Header } from "@/components";
import { ProductList } from "./components/ProductList";
import { useArticles } from "@/hooks/useArticles";
import { IconFaceSurprisedCircleLine } from "@karrotmarket/react-monochrome-icon";
import { ProgressCircle } from "seed-design/ui/progress-circle";
import PromotionalBanner from "@/components/PromotionalBanner";
import ProductFilter from "@/components/ProductFilter";
import { useProductFilter } from "@/hooks/useProductFilter";

const Main = () => {
  const { data: articles, isLoading } = useArticles();

  const { selectedFilter, setSelectedFilter, filterOptions, filteredArticles } =
    useProductFilter({
      articles: articles?.items || [],
    });

  return (
    <AppScreen>
      <Header route="main" />
      <div className="px-4 py-2">
        <PromotionalBanner />
      </div>

      {/* Filter Section */}
      {articles && (
        <div className="px-4 py-3 border-b border-gray-100">
          <ProductFilter
            options={filterOptions}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <ProgressCircle tone="neutral" size="40" />
        </div>
      ) : articles ? (
        <ProductList
          articles={filteredArticles}
          onClickItem={id => console.log("상품 클릭:", id)}
          onToggleFavorite={id => console.log("찜 토글:", id)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <IconFaceSurprisedCircleLine size={48} />
          <p className="mt-2">목록을 얻어오는데 실패했어요..</p>
        </div>
      )}
    </AppScreen>
  );
};

export default Main;
