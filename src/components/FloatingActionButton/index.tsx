import React from "react";
import { cn } from "@/utils/tailwind-helpers";

interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  label,
  onClick,
  ...props
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={cn(
        "fixed bottom-12 right-6 z-50 flex items-center justify-center rounded-xl bg-sogang-700 text-white transition-all duration-200 ease-in-out w-16 h-16 hover:!bg-sogang-300 hover:scale-105 active:scale-95 shadow-[4px_8px_24px_0px_rgba(0,0,0,0.2)]",
        props.className
      )}
      onClick={handleClick}
      {...props}
    >
      {icon ? (
        <span className="flex items-center justify-center w-8 h-8">{icon}</span>
      ) : label ? (
        <span className="font-semibold">{label}</span>
      ) : (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
};

export default FloatingActionButton;
