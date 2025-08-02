"use client";
import React from "react";
import type { Article } from "@/types/article";
import { ProductCard } from "@/components/ProductCard";

interface ProductListProps {
  articles: Article[];
  onClickItem?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  articles,
  onClickItem,
  onToggleFavorite,
}) => {
  if (articles.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        등록된 상품이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {articles.map(article => (
        <ProductCard
          key={article.id}
          article={article}
          onClick={onClickItem}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};
