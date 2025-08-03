"use client";
import React from "react";
import { cn } from "@/utils/tailwind-helpers";
import {
  IconHeartLine,
  IconLocationpinFill,
} from "@karrotmarket/react-monochrome-icon";
import type { Article } from "@/types/article";

interface ProductCardProps {
  article: Article;
  onClick?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  article,
  onClick,
  onToggleFavorite,
}) => {
  const { id, title, price, imageUrl, status, location } = article;

  return (
    <div
      className="relative w-full rounded-lg border border-gray-300 bg-white overflow-hidden cursor-pointer"
      onClick={() => onClick?.(id)}
    >
      {/* 상품 이미지 */}
      <div className="relative w-full h-20">
        <img
          src={imageUrl || "/placeholder.png"}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* 상태 뱃지 */}
        {status !== "active" && (
          <span
            className={cn(
              "absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-semibold text-white",
              status === "reserved" && "bg-yellow-500",
              status === "sold" && "bg-gray-600"
            )}
          >
            {status === "reserved" ? "예약중" : "거래완료"}
          </span>
        )}

        {/* 찜 버튼 */}
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            onToggleFavorite?.(id);
          }}
          className="absolute top-2 right-2 rounded-full p-1 hover:bg-white"
        >
          <IconHeartLine className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* 상품 정보 */}
      <div className="p-2 flex flex-col items-start gap-1">
        <h3 className="text-sm font-medium line-clamp-1">{title}</h3>
        <p className="text-red-500 font-semibold text-base">
          {price.toLocaleString()}원
        </p>
        <div className="w-full text-xs text-gray-500">
          <span className="flex gap-1 items-center">
            <IconLocationpinFill width={10} height={10} />
            {location}
          </span>
        </div>
      </div>
    </div>
  );
};
