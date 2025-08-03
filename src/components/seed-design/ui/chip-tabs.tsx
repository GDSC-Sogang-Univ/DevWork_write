import { ChipTabs as SeedChipTabs } from "@seed-design/react";

export const ChipTabsRoot = SeedChipTabs.Root;

export const ChipTabsList = SeedChipTabs.List;

export const ChipTabsTrigger = SeedChipTabs.Trigger;

export const ChipTabsCarousel = (
  props: Omit<SeedChipTabs.CarouselProps, "asChild">
) => {
  const { children, ...otherProps } = props;
  return (
    <SeedChipTabs.Carousel {...otherProps}>
      <SeedChipTabs.CarouselCamera>{children}</SeedChipTabs.CarouselCamera>
    </SeedChipTabs.Carousel>
  );
};
ChipTabsCarousel.displayName = "ChipTabsCarousel";

export const ChipTabsContent = SeedChipTabs.Content;
