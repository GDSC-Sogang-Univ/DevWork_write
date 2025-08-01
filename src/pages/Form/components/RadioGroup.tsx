import React from "react";
import { cn } from "@/utils/tailwind-helpers";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  required?: boolean;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  layout?: "horizontal" | "vertical";
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  required = false,
  options,
  value,
  onChange,
  error,
  className,
  layout = "horizontal",
}) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
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
      <div
        className={cn(
          "flex gap-4",
          layout === "horizontal" ? "flex-row flex-wrap" : "flex-col"
        )}
      >
        {options.map(option => (
          <label
            key={option.value}
            className="flex flex-row gap-1 items-center cursor-pointer"
          >
            <div
              className={cn(
                "size-6 rounded-full border border-solid flex items-center justify-center",
                "transition-all",
                value === option.value
                  ? "bg-[#e84336] border-[#e84336]"
                  : "bg-white border-[#dcdee3]"
              )}
              onClick={() => onChange(option.value)}
            >
              {value === option.value && (
                <div className="size-2.5 rounded-full bg-white" />
              )}
            </div>
            <span className="text-[#1a1c20] text-[16px] font-pretendard tracking-[-0.16px]">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <span className="text-[#ca1d13] text-[14px] font-pretendard tracking-[-0.14px]">
          {error}
        </span>
      )}
    </div>
  );
};

export default RadioGroup;
