import { AppScreen } from "@stackflow/plugin-basic-ui";
import { Carousel, Header } from "@/components";
import { ProductList } from "./components/ProductList";
import { CategoryList } from "./components/CategoryList";
import { useArticles } from "@/hooks/useArticles";
import {
  IconFaceSurprisedCircleLine,
  IconPlusLine,
} from "@karrotmarket/react-monochrome-icon";
import { ProgressCircle } from "seed-design/ui/progress-circle";
import { useState, useMemo } from "react";
import type { Article } from "@/types/article";

const Main = () => {
  const { data: articles, isLoading } = useArticles();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const { push } = useFlow();
  const handleRegister = () => {
    push("form", {});
  };

  // 카테고리별 필터링된 상품 목록
  const filteredArticles = useMemo(() => {
    if (!articles?.items) return [];

    if (selectedCategory === "전체") {
      return articles.items;
    }

    return articles.items.filter(
      (article: Article) => article.category === selectedCategory
    );
  }, [articles?.items, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <AppScreen>
      <Header route="main" />
      <Carousel className="mb-6" />

      {/* 카테고리 필터 */}
      <CategoryList
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        className="mb-4"
      />

      {isLoading ? (
        <ProgressCircle tone="neutral" size="40" />
      ) : articles ? (
        <ProductList
          articles={filteredArticles}
          onClickItem={id => console.log("상품 클릭:", id)}
          onToggleFavorite={id => console.log("찜 토글:", id)}
        />
      ) : (
        <div>
          <IconFaceSurprisedCircleLine />
          목록을 얻어오는데 실패했어요..
        </div>
      )}

      <FloatingActionButton icon={<IconPlusLine />} onClick={handleRegister} />
    </AppScreen>
  );
};

export default Main;
