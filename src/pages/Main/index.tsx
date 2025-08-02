import { AppScreen } from "@stackflow/plugin-basic-ui";
import { Header } from "@/components";
import type { Article } from "@/types/article";
import { ProductList } from "./components/ProductList";

const mockArticles: Article[] = [
  {
    id: "1",
    title: "아이폰 14 126GB 블랙",
    price: 850000,
    location: "도서관 앞",
    imageUrl: "/images/iphone14.jpg",
    likeCount: 10,
    chatCount: 2,
    status: "reserved",
    category: "전자기기",
    userId: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "나이키 에어맥스 운동화",
    price: 120000,
    location: "학생회관",
    imageUrl: "/images/airmax.jpg",
    likeCount: 5,
    chatCount: 1,
    status: "active",
    category: "의류",
    userId: "user2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Main = () => {
  return (
    <AppScreen>
      <Header route="main" />
      <ProductList
        articles={mockArticles}
        onClickItem={id => console.log("상품 클릭:", id)}
        onToggleFavorite={id => console.log("찜 토글:", id)}
      />
    </AppScreen>
  );
};

export default Main;
