export type ProductCondition =
  | "새 상품"
  | "거의 새 상품"
  | "사용감 있음"
  | "고장/파손";
export type TradeMethod = "직거래" | "택배거래";

export interface CreateProductRequest {
  name: string;
  category: string;
  condition: ProductCondition;
  price: number;
  priceNegotiable: boolean;
  description: string;
  images: File[];
  tradeMethod: TradeMethod;
  tradeLocation?: string;
}

export interface CreateProductResponse {
  id: string;
  success: boolean;
  message: string;
}

export interface ProductFormData {
  name: string;
  category: string;
  condition: ProductCondition;
  price: string; // Form에서는 string으로 처리
  priceNegotiable: boolean;
  description: string;
  tradeMethod: TradeMethod;
  tradeLocation: string;
}
