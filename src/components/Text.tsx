import React from "react";

type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";
type TextWeight = "regular" | "bold" | "heavy";
type TextAlign = "left" | "center" | "right" | "justify";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  size?: TextSize;
  weight?: TextWeight;
  align?: TextAlign;
  fontFamily?: string;
  children: React.ReactNode;
}

const sizeClasses: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

const weightClasses: Record<TextWeight, string> = {
  regular: "font-normal",
  bold: "font-bold",
  heavy: "font-black",
};

const alignClasses: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const Text: React.FC<TextProps> = ({
  as = "span",
  size = "base",
  weight = "regular",
  align,
  fontFamily = "KarrotSans",
  className = "",
  children,
  style,
  ...props
}) => {
  const Component = as;

  const classes = [
    sizeClasses[size],
    weightClasses[weight],
    align && alignClasses[align],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inlineStyle = {
    fontFamily: `"${fontFamily}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`,
    ...style,
  };

  return React.createElement(
    Component,
    { className: classes, style: inlineStyle, ...props },
    children
  );
};

export default Text;
export type { TextProps, TextSize, TextWeight, TextAlign };
