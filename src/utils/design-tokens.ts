export const sogangColors = {
  50: "#fef2f1",
  100: "#fde6e4",
  200: "#fbcfc9",
  300: "#f7a9a1",
  400: "#f17a6c",
  500: "#e84336",
  600: "#d4271a",
  700: "#b11f15",
  800: "#921d14",
  900: "#791e16",
  950: "#420b08",
  blueLight: "#4A90E2",
  blue: "#1E3A8A",
  gray: "#6B7280",
  grayLight: "#F3F4F6",
} as const;

export type SogangColorKey = keyof typeof sogangColors;

export const getSogangColor = (key: SogangColorKey): string => {
  return sogangColors[key];
};
