import {
  ActionButton as SeedActionButton,
  type ActionButtonProps as SeedActionButtonProps,
} from "@seed-design/react";
import * as React from "react";
import { LoadingIndicator } from "./loading-indicator";

export type ActionButtonProps = SeedActionButtonProps;

/**
 * @see https://seed-design.io/react/components/action-button
 * If `asChild` is enabled, manual handling of `LoadingIndicator` is required.
 */
export const ActionButton = React.forwardRef<
  React.ElementRef<typeof SeedActionButton>,
  ActionButtonProps
>(({ loading = false, children, variant, ...otherProps }, ref) => {
  // brandSolid variant일 때 SOGANG-700 색상 적용
  const customStyle =
    variant === "brandSolid" ? { backgroundColor: "#E84336" } : {};

  return (
    <SeedActionButton
      ref={ref}
      loading={loading}
      variant={variant}
      style={customStyle}
      {...otherProps}
    >
      {loading && !otherProps.asChild ? (
        <LoadingIndicator>{children}</LoadingIndicator>
      ) : (
        children
      )}
    </SeedActionButton>
  );
});
ActionButton.displayName = "ActionButton";

/**
 * This file is generated snippet from the Seed Design.
 * You can extend the functionality from this snippet if needed.
 */
