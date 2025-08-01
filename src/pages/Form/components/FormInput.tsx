import React from "react";
import { cn } from "@/utils/tailwind-helpers";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  maxLength?: number;
  currentLength?: number;
  suffix?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  required = false,
  error,
  maxLength,
  currentLength = 0,
  suffix,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
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
      <div className="flex flex-col gap-1 w-full">
        <div className="relative">
          <input
            className={cn(
              "w-full h-12 px-3 py-2 rounded-lg",
              "bg-white text-[16px] font-pretendard tracking-[-0.16px]",
              "border border-solid",
              "placeholder:text-[#868b94]",
              "focus:outline-none focus:border-[#555d6d]",
              "transition-colors",
              error ? "border-[#b0b3ba]" : "border-[#eeeff1]",
              "text-[#1a1c20]",
              suffix && "pr-8",
              className
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#868b94] text-[16px] font-pretendard tracking-[-0.16px]">
              {suffix}
            </span>
          )}
        </div>
        {error && (
          <span className="text-[#ca1d13] text-[14px] font-pretendard tracking-[-0.14px]">
            {error}
          </span>
        )}
        {maxLength && (
          <div className="text-right">
            <span className="text-[#868b94] text-[12px] font-pretendard tracking-[-0.12px]">
              {currentLength}/{maxLength}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
