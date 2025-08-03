import type { ReactNode } from "react";
import { ActionButton } from "seed-design/ui/action-button";

interface Props {
  children: ReactNode;
  customStyle?: string;
  aria_label: string;
  onClickFunc: () => void;
}

function FloatingBtn({
  children,
  customStyle,
  onClickFunc,
  aria_label,
}: Props) {
  return (
    <ActionButton
      layout="iconOnly"
      variant="brandSolid"
      aria-label={aria_label}
      onClick={onClickFunc}
      size="large"
      className={`!fixed !bottom-20 !right-4 z-50 !shadow-lg ${customStyle}`}
    >
      {children}
    </ActionButton>
  );
}

export default FloatingBtn;
