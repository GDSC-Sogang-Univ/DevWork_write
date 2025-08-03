import { AppScreen } from "@stackflow/plugin-basic-ui";
import { Header } from "@/components";
import { ProductList } from "./components/ProductList";
import { useArticles } from "@/hooks/useArticles";
import { IconFaceSurprisedCircleLine } from "@karrotmarket/react-monochrome-icon";
import { ProgressCircle } from "seed-design/ui/progress-circle";
import FloatingWritingBtn from "@/components/Button/FloatingWritingBtn";
import { CATEGORY_LIST, type CategoryType } from "@/types/category";
import Chip from "@/components/Chip";
import { useEffect, useState } from "react";
import type { Article } from "@/types/article";

const Main = () => {
  const { data: articles, isLoading } = useArticles();
  const [category, setCategory] = useState<CategoryType>("전체");
  const [data, setData] = useState<Article[] | null>(null);

  useEffect(() => {
    if (articles) setData(articles.items);
  }, [articles]);

  useEffect(() => {
    if (category === "전체") {
      setData(articles?.items ?? null);
    } else
      setData(
        articles?.items.filter(item => item.category === category) ?? null
      );
  }, [category]);

  return (
    <AppScreen>
      <Header route="main" />

      <div className="p-4 flex gap-2">
        {CATEGORY_LIST.map(item => (
          <Chip
            key={item}
            label={item}
            isSelected={item == category}
            onClickFunc={() => setCategory(item)}
          />
        ))}
      </div>

      {isLoading ? (
        <ProgressCircle tone="neutral" size="40" />
      ) : data ? (
        <ProductList
          articles={data}
          onClickItem={id => console.log("상품 클릭:", id)}
          onToggleFavorite={id => console.log("찜 토글:", id)}
        />
      ) : (
        <div>
          <IconFaceSurprisedCircleLine />
          목록을 얻어오는데 실패했어요..
        </div>
      )}
      <FloatingWritingBtn />
    </AppScreen>
  );
};

export default Main;
