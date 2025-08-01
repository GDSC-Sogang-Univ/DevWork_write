import React, { useState } from "react";
import { cn } from "@/utils/tailwind-helpers";

interface CategoryDropdownProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

const categories = [
  "전자기기",
  "의류",
  "도서",
  "가구",
  "스포츠/레저",
  "생활용품",
  "기타",
];

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  label,
  required = false,
  value,
  onChange,
  error,
  placeholder = "카테고리를 선택해주세요",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category: string) => {
    onChange(category);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <div className="flex flex-row gap-0.5 items-center">
        <span className="text-[#1a1c20] text-[16px] font-pretendard tracking-[-0.16px]">
          {label}
        </span>
        {required && (
          <span className="text-[#ca1d13] text-[14px] font-pretendard tracking-[-0.14px]">
            *
          </span>
        )}
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full h-12 px-3 py-2 rounded-lg text-left",
            "bg-white text-[16px] font-pretendard tracking-[-0.16px]",
            "border border-solid",
            "focus:outline-none focus:border-[#555d6d]",
            "transition-colors",
            error ? "border-[#b0b3ba]" : "border-[#eeeff1]",
            value ? "text-[#1a1c20]" : "text-[#b0b3ba]"
          )}
        >
          {value || placeholder}
        </button>

        {/* Dropdown Arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={cn("transition-transform", isOpen && "rotate-180")}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="#868b94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-[#eeeff1] shadow-lg z-10">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => handleSelect(category)}
                className="w-full px-3 py-2 text-left text-[16px] font-pretendard tracking-[-0.16px] text-[#1a1c20] hover:bg-[#f8f9fa] first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <span className="text-[#ca1d13] text-[14px] font-pretendard tracking-[-0.14px]">
          {error}
        </span>
      )}
    </div>
  );
};

export default CategoryDropdown;
