import { z } from "zod";
import type { ProductCondition, TradeMethod } from "../types/product";

const productConditions: readonly ProductCondition[] = [
  "새 상품",
  "거의 새 상품",
  "사용감 있음",
  "고장/파손",
] as const;
const tradeMethods: readonly TradeMethod[] = ["직거래", "택배거래"] as const;

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "상품명을 정확히 입력해주세요.")
    .max(40, "상품명은 40자 이내로 입력해주세요."),

  category: z.string().min(1, "카테고리를 선택해주세요."),

  condition: z.enum(productConditions),

  price: z
    .string()
    .min(1, "가격을 입력해주세요.")
    .regex(/^\d+$/, "숫자만 입력해주세요.")
    .refine(val => parseInt(val) > 0, "가격은 0보다 커야 합니다."),

  priceNegotiable: z.boolean(),

  description: z.string().max(1000, "상품 설명은 1000자 이내로 입력해주세요."),

  tradeMethod: z.enum(tradeMethods),

  tradeLocation: z.string(),
});

export type ProductFormSchema = z.infer<typeof productSchema>;
