export const CATEGORY_LIST = [
  "전체",
  "의류",
  "가구",
  "학용품",
  "생활용품",
  "게임/취미",
  "도서",
  "전자기기",
] as const;

export type CategoryType = (typeof CATEGORY_LIST)[number];
