import { useState, useMemo } from "react";
import type { FilterOption } from "@/types/filter";
import type { Article } from "@/types/article";

interface UseProductFilterProps {
  articles: Article[];
  defaultFilter?: string;
}

export const useProductFilter = ({
  articles,
  defaultFilter = "all",
}: UseProductFilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

  // Generate filter options based on available categories
  const filterOptions: FilterOption[] = useMemo(() => {
    const categoryCount = articles.reduce(
      (acc, article) => {
        const category = article.category || "other";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const options: FilterOption[] = [
      {
        id: "all",
        label: "전체",
        value: "all",
        count: articles.length,
      },
    ];

    // Add category-specific filters
    Object.entries(categoryCount).forEach(([category, count]) => {
      if (category !== "all") {
        options.push({
          id: category,
          label: getCategoryLabel(category),
          value: category,
          count,
        });
      }
    });

    return options;
  }, [articles]);

  // Filter articles based on selected filter
  const filteredArticles = useMemo(() => {
    if (selectedFilter === "all") {
      return articles;
    }
    return articles.filter(
      article =>
        article.category === selectedFilter ||
        (!article.category && selectedFilter === "other")
    );
  }, [articles, selectedFilter]);

  return {
    selectedFilter,
    setSelectedFilter,
    filterOptions,
    filteredArticles,
  };
};

// Helper function to get user-friendly category labels
const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    electronics: "전자제품",
    fashion: "패션/의류",
    books: "도서",
    sports: "스포츠/레저",
    home: "생활용품",
    beauty: "뷰티/미용",
    food: "식품",
    other: "기타",
  };
  return labels[category] || category;
};
