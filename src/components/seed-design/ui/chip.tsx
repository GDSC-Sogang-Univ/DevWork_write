import type { ChipVariantProps } from "@seed-design/css/recipes/chip";
import {
  ChipLabel as SeedChipLabel,
  ChipPrefixAvatar as SeedChipPrefixAvatar,
  ChipPrefixIcon as SeedChipPrefixIcon,
  ChipRoot as SeedChipRoot,
  ChipSuffixIcon as SeedChipSuffixIcon,
  type ChipRootProps as SeedChipRootProps,
} from "@seed-design/react";
import type { PrimitiveProps } from "@seed-design/react-primitive";
import { Checkbox, RadioGroup } from "@seed-design/react/primitive";
import * as React from "react";

// Create a base props interface that doesn't include DOM attributes to avoid conflicts
export interface ChipBaseProps extends PrimitiveProps, ChipVariantProps {}

export interface ToggleChipProps extends ChipBaseProps, Checkbox.RootProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;

  rootRef?: React.Ref<HTMLLabelElement>;
}

/**
 * @see https://seed-design.io/react/components/chip
 */
export const ToggleChip = React.forwardRef<HTMLInputElement, ToggleChipProps>(
  (
    {
      children,
      size,
      layout = "withText",
      variant,
      inputProps,
      rootRef,
      ...otherProps
    },
    ref
  ) => {
    return (
      <SeedChipRoot asChild size={size} layout={layout} variant={variant}>
        <Checkbox.Root ref={rootRef} {...otherProps}>
          {children}
          <Checkbox.HiddenInput ref={ref} {...inputProps} />
        </Checkbox.Root>
      </SeedChipRoot>
    );
  }
);
ToggleChip.displayName = "Chip.Toggle";

export interface ButtonChipProps extends ChipBaseProps, SeedChipRootProps {
  children?: React.ReactNode;
}

/**
 * @see https://seed-design.io/react/components/chip
 */
export const ButtonChip = React.forwardRef<HTMLButtonElement, ButtonChipProps>(
  ({ children, ...otherProps }, ref) => {
    return (
      <SeedChipRoot ref={ref} {...otherProps}>
        {children}
      </SeedChipRoot>
    );
  }
);
ButtonChip.displayName = "Chip.Button";

export const RadioChipRoot = RadioGroup.Root;

export interface RadioChipItemProps
  extends ChipBaseProps,
    RadioGroup.ItemProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  rootRef?: React.Ref<HTMLLabelElement>;
}

export const RadioChipItem = React.forwardRef<
  HTMLInputElement,
  RadioChipItemProps
>(
  (
    {
      children,
      inputProps,
      rootRef,
      size,
      layout = "withText",
      variant,
      ...otherProps
    },
    ref
  ) => {
    return (
      <SeedChipRoot asChild size={size} layout={layout} variant={variant}>
        <RadioGroup.Item ref={rootRef} {...otherProps}>
          {children}
          <RadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
        </RadioGroup.Item>
      </SeedChipRoot>
    );
  }
);
RadioChipItem.displayName = "Chip.RadioItem";

export const ChipLabel = SeedChipLabel;

export const ChipPrefixIcon = SeedChipPrefixIcon;

export const ChipPrefixAvatar = SeedChipPrefixAvatar;

export const ChipSuffixIcon = SeedChipSuffixIcon;

export const Chip = Object.assign(
  () => {
    console.warn(
      "Chip is a base component and should not be rendered. Use Chip.Toggle or Chip.Button instead."
    );
  },
  {
    Toggle: ToggleChip,
    Button: ButtonChip,
    RadioRoot: RadioChipRoot,
    RadioItem: RadioChipItem,
    Label: ChipLabel,
    PrefixIcon: ChipPrefixIcon,
    PrefixAvatar: ChipPrefixAvatar,
    SuffixIcon: ChipSuffixIcon,
  }
);

/**
 * This file is generated snippet from the Seed Design.
 * You can extend the functionality from this snippet if needed.
 */
