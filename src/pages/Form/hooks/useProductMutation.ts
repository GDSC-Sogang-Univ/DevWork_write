import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/api/products";
import type {
  CreateProductRequest,
  CreateProductResponse,
} from "../types/product";

export const useCreateProductMutation = () => {
  return useMutation<CreateProductResponse, Error, CreateProductRequest>({
    mutationFn: createProduct,
  });
};
