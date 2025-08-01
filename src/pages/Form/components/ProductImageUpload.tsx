import React from "react";
import { cn } from "@/utils/tailwind-helpers";

interface ProductImageUploadProps {
  label: string;
  required?: boolean;
  imageCount?: number;
  maxImages?: number;
  error?: string;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  label,
  required = false,
  imageCount = 0,
  maxImages = 10,
  error,
}) => {
  return (
    <div className="flex flex-col gap-4 w-20">
      <div className="flex flex-row gap-0.5 items-center">
        <span className="text-[#1a1c20] text-[18px] font-pretendard font-medium tracking-[-0.18px]">
          {label}
        </span>
        {required && (
          <span className="text-[#ca1d13] text-[14px] font-pretendard tracking-[-0.14px]">
            *
          </span>
        )}
      </div>

      <div
        className={cn(
          "h-20 px-7 py-[19px] rounded-[7px] border-[1.5px] border-dashed",
          "flex items-center justify-center cursor-pointer",
          "transition-colors hover:bg-gray-50",
          error ? "border-[#ca1d13]" : "border-[#b0b3ba]"
        )}
      >
        <div className="flex flex-col items-center justify-center">
          {/* Camera Icon */}
          <div className="size-5 mb-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15.833 15.833H4.167c-.917 0-1.667-.75-1.667-1.666V7.5c0-.917.75-1.667 1.667-1.667h2.5l.833-1.666h5l.833 1.666h2.5c.917 0 1.667.75 1.667 1.667v6.667c0 .916-.75 1.666-1.667 1.666z"
                stroke="#868b94"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                stroke="#868b94"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-[#868b94] text-[12px] font-pretendard tracking-[-0.12px]">
            {imageCount}/{maxImages}
          </span>
        </div>
      </div>

      {error && (
        <span className="text-[#ca1d13] text-[14px] font-pretendard tracking-[-0.14px]">
          {error}
        </span>
      )}
    </div>
  );
};

export default ProductImageUpload;
