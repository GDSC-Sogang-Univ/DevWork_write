import React from "react";
import {
  IconMagnifyingglassLine,
  IconPersonFill,
} from "@karrotmarket/react-monochrome-icon";
import { ActionButton } from "seed-design/ui/action-button";
import { useFlow } from "@/lib/stackflow";
import type { RouteName } from "@/routes";
import { cn } from "@/utils/tailwind-helpers";

interface HeaderProps {
  route: RouteName;
  title?: string;
  showBackButton?: boolean;
  showSearch?: boolean;
  showProfile?: boolean;
  showRegisterButton?: boolean;
  onBack?: () => void;
  customActions?: React.ReactNode;
  className?: string;
}

// Route별 기본 설정
const routeConfig: Record<RouteName, Partial<HeaderProps>> = {
  main: {
    showSearch: true,
    showProfile: true,
    showRegisterButton: true,
    title: "서강마켓",
  },
  form: {
    showBackButton: true,
    title: "상품 등록",
  },
};

const Header: React.FC<HeaderProps> = ({
  route,
  title,
  showBackButton,
  showSearch,
  showProfile,
  showRegisterButton,
  onBack,
  customActions,
  className,
  ...overrides
}) => {
  const { push, pop } = useFlow();

  // Route 기본 설정과 props 병합
  const config = { ...routeConfig[route], ...overrides };
  const finalTitle = title ?? config.title;
  const finalShowBackButton = showBackButton ?? config.showBackButton ?? false;
  const finalShowSearch = showSearch ?? config.showSearch ?? false;
  const finalShowProfile = showProfile ?? config.showProfile ?? false;
  const finalShowRegisterButton =
    showRegisterButton ?? config.showRegisterButton ?? false;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      pop();
    }
  };

  const handleRegister = () => {
    push("form", {});
  };

  // Main 타입 헤더 (기존 Main 페이지 스타일)
  if (route === "main") {
    return (
      <div className={cn("p-4 flex justify-between items-center", className)}>
        <span className="text-[24px] font-black text-sogang-700">
          {finalTitle}
        </span>
        <div className="flex gap-5 items-center">
          {finalShowSearch && (
            <IconMagnifyingglassLine color="#555D6D" width={24} height={24} />
          )}
          {finalShowProfile && (
            <IconPersonFill color="#555D6D" width={24} height={24} />
          )}
          {finalShowRegisterButton && (
            <ActionButton variant="brandSolid" onClick={handleRegister}>
              상품등록
            </ActionButton>
          )}
          {customActions}
        </div>
      </div>
    );
  }

  // Page 타입 헤더 (Form 페이지와 같은 일반 페이지 스타일)
  return (
    <>
      {/* Status Bar Space */}
      <div className="h-11 bg-white" />

      {/* App Bar */}
      <div
        className={cn(
          "relative h-14 bg-white border-b border-[#e2e5eb]",
          className
        )}
      >
        {finalShowBackButton && (
          <button
            onClick={handleBack}
            className="absolute left-4 top-4 size-6 flex items-center justify-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="#313131"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {finalTitle && (
          <h1 className="absolute left-1/2 top-[17.5px] -translate-x-1/2 text-[#313131] text-[18px] font-pretendard font-bold">
            {finalTitle}
          </h1>
        )}

        {customActions && (
          <div className="absolute right-4 top-4 flex items-center gap-2">
            {customActions}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
