import React from "react";
import { clsx } from "clsx";
import type { FilterOption } from "@/types/filter";

interface ProductFilterProps {
  options: FilterOption[];
  selectedFilter: string;
  onFilterChange: (filterId: string) => void;
  className?: string;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  options,
  selectedFilter,
  onFilterChange,
  className,
}) => {
  return (
    <div className={clsx("flex gap-2 overflow-x-auto pb-2", className)}>
      {options.map(option => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.value)}
          className={clsx(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "border-2 whitespace-nowrap",
            selectedFilter === option.value
              ? "bg-sogang-700 text-white border-sogang-700"
              : "bg-white text-gray-700 border-gray-200 hover:border-sogang-300 hover:bg-sogang-50"
          )}
        >
          {option.label}
          {option.count !== undefined && (
            <span
              className={clsx(
                "ml-1 text-xs",
                selectedFilter === option.value
                  ? "text-white opacity-80"
                  : "text-gray-500"
              )}
            >
              ({option.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ProductFilter;
