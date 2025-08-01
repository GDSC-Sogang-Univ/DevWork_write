// Sogang color scales
type SogangColorScale =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";
type SogangColorSpecial = "blue" | "blue-light" | "gray" | "gray-light";
type SogangColor =
  | `sogang-${SogangColorScale}`
  | `sogang-${SogangColorSpecial}`;

// Tailwind color utilities
export type TextColor = `text-${SogangColor}`;
export type BackgroundColor = `bg-${SogangColor}`;
export type BorderColor = `border-${SogangColor}`;

// Helper function for className with type hints
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Type-safe color class generators
export const sogangColors = {
  text: (scale: SogangColorScale | SogangColorSpecial): TextColor =>
    `text-sogang-${scale}` as TextColor,
  bg: (scale: SogangColorScale | SogangColorSpecial): BackgroundColor =>
    `bg-sogang-${scale}` as BackgroundColor,
  border: (scale: SogangColorScale | SogangColorSpecial): BorderColor =>
    `border-sogang-${scale}` as BorderColor,
} as const;

// Pre-defined commonly used color classes
export const colors = {
  primary: {
    text: "text-sogang-700" as const,
    bg: "bg-sogang-700" as const,
    border: "border-sogang-700" as const,
  },
  secondary: {
    text: "text-sogang-blue" as const,
    bg: "bg-sogang-blue" as const,
    border: "border-sogang-blue" as const,
  },
  accent: {
    text: "text-sogang-500" as const,
    bg: "bg-sogang-500" as const,
    border: "border-sogang-500" as const,
  },
} as const;
