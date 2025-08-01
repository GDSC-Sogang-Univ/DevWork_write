import type { ProductCondition, TradeMethod } from "../types/product";

// 상품 상태 옵션
export const productConditionOptions = [
  { value: "새 상품" as ProductCondition, label: "새 상품" },
  { value: "거의 새 상품" as ProductCondition, label: "거의 새 상품" },
  { value: "사용감 있음" as ProductCondition, label: "사용감 있음" },
  { value: "고장/파손" as ProductCondition, label: "고장/파손" },
];

// 거래 방식 옵션
export const tradeMethodOptions = [
  { value: "직거래" as TradeMethod, label: "직거래" },
  { value: "택배거래" as TradeMethod, label: "택배거래" },
];

// 숫자만 입력 허용하는 함수
export const formatPrice = (value: string): string => {
  return value.replace(/[^0-9]/g, "");
};

// 가격에 천 단위 콤마 추가
export const formatPriceWithComma = (value: string): string => {
  const numericValue = formatPrice(value);
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 문자열 길이 검증
export const validateLength = (
  value: string | undefined,
  maxLength: number
): boolean => {
  if (!value) return true;
  return value.length <= maxLength;
};

// 필수 필드 검증
export const validateRequired = (value: string | undefined): boolean => {
  return Boolean(value && value.trim().length > 0);
};
