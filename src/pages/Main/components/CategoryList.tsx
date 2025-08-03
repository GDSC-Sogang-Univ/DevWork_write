import * as React from "react";
import {
  ChipTabsList,
  ChipTabsRoot,
  ChipTabsTrigger,
} from "@/components/seed-design/ui/chip-tabs";
import "./CategoryList.css";

const categories = [
  "전체",
  "의류",
  "가구",
  "학용품",
  "생활용품",
  "게임/취미",
  "도서",
  "전자기기",
];

interface CategoryListProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  selectedCategory,
  onCategoryChange,
  className = "",
}) => {
  return (
    <div className={`px-4 py-3 ${className}`}>
      <ChipTabsRoot
        variant="brandSolid"
        value={selectedCategory}
        className="category-tabs-root"
        onValueChange={value => onCategoryChange(value)}
      >
        <ChipTabsList className="category-tabs-list">
          {categories.map(category => (
            <ChipTabsTrigger
              key={category}
              value={category}
              className="category-tabs-trigger"
            >
              {category}
            </ChipTabsTrigger>
          ))}
        </ChipTabsList>
      </ChipTabsRoot>
    </div>
  );
};

export default CategoryList;
