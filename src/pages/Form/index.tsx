import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFlow } from "@/lib/stackflow";
import { Header } from "@/components";
import { useCreateProductMutation } from "./hooks/useProductMutation";
import { productSchema } from "./schemas/productSchema";
import type { z } from "zod";
import type { ProductCondition, TradeMethod } from "./types/product";
import {
  productConditionOptions,
  tradeMethodOptions,
} from "./utils/validation";

import FormInput from "./components/FormInput";
import FormTextarea from "./components/FormTextarea";
import RadioGroup from "./components/RadioGroup";
import CategoryDropdown from "./components/CategoryDropdown";
import ProductImageUpload from "./components/ProductImageUpload";

const Form = () => {
  const { pop } = useFlow();
  const createProductMutation = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      condition: "새 상품",
      price: "",
      priceNegotiable: false,
      description: "",
      tradeMethod: "직거래",
      tradeLocation: "",
    },
  });

  const watchedValues = watch();
  const watchedTradeMethod = watch("tradeMethod");

  const onSubmit = async (data: any) => {
    try {
      const submitData = {
        ...data,
        price: parseInt(data.price),
        images: [], // TODO: 이미지 업로드 구현
      };

      const result = await createProductMutation.mutateAsync(submitData);

      if (result.success) {
        alert(result.message);
        pop();
      }
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AppScreen>
      <div className="min-h-screen bg-white pb-32">
        <Header route="form" />

        <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-6 space-y-8">
          {/* 상품 사진 */}
          <ProductImageUpload label="상품 사진" imageCount={0} maxImages={10} />

          {/* 기본 정보 */}
          <div className="space-y-6">
            <h2 className="text-[#1a1c20] text-[18px] font-pretendard font-medium tracking-[-0.18px]">
              기본 정보
            </h2>

            {/* 상품명 */}
            <FormInput
              label="상품명"
              required
              placeholder="상품명을 입력해주세요"
              maxLength={40}
              currentLength={watchedValues.name?.length || 0}
              error={errors.name?.message}
              {...register("name")}
            />

            {/* 카테고리 */}
            <CategoryDropdown
              label="카테고리"
              required
              value={watchedValues.category || ""}
              onChange={value => setValue("category", value)}
              error={errors.category?.message}
            />

            {/* 상품 상태 */}
            <RadioGroup
              label="상품 상태"
              required
              options={productConditionOptions}
              value={watchedValues.condition || "새 상품"}
              onChange={value =>
                setValue("condition", value as ProductCondition)
              }
              error={errors.condition?.message}
              layout="horizontal"
            />

            {/* 가격 */}
            <div className="space-y-2">
              <FormInput
                label="가격"
                required
                placeholder="가격을 입력해주세요"
                suffix="원"
                error={errors.price?.message}
                {...register("price")}
              />

              {/* 가격 제안받기 체크박스 */}
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative size-[18px]">
                  <input
                    type="checkbox"
                    className="sr-only"
                    {...register("priceNegotiable")}
                  />
                  <div className="size-[18px] rounded border border-[#dcdee3] bg-white flex items-center justify-center">
                    {watchedValues.priceNegotiable && (
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path
                          d="M1 4.5L4 7.5L11 0.5"
                          stroke="#ca1d13"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[#555d6d] text-[14px] font-pretendard tracking-[-0.14px]">
                  가격 제안받기
                </span>
              </label>
            </div>
          </div>

          {/* 상품 설명 */}
          <FormTextarea
            label="상품 설명"
            placeholder="상품에 대한 자세한 설명을 입력해주세요.\n상세히 적어주실 수록 거래 성공 확률이 올라가요."
            maxLength={1000}
            currentLength={watchedValues.description?.length || 0}
            error={errors.description?.message}
            {...register("description")}
          />

          {/* 거래 정보 */}
          <div className="space-y-4">
            <h2 className="text-[#1a1c20] text-[18px] font-pretendard font-medium tracking-[-0.18px]">
              거래 정보
            </h2>

            {/* 거래 방식 */}
            <RadioGroup
              label="거래 방식"
              required
              options={tradeMethodOptions}
              value={watchedValues.tradeMethod || "직거래"}
              onChange={value => setValue("tradeMethod", value as TradeMethod)}
              error={errors.tradeMethod?.message}
              layout="horizontal"
            />

            {/* 거래 장소 (직거래 선택 시만 표시) */}
            {watchedTradeMethod === "직거래" && (
              <FormInput
                label="거래 장소"
                required
                placeholder="거래 장소를 입력해주세요. 예) 서강대앞"
                maxLength={40}
                currentLength={watchedValues.tradeLocation?.length || 0}
                error={errors.tradeLocation?.message}
                {...register("tradeLocation")}
              />
            )}
          </div>
        </form>

        {/* Bottom Fixed Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-[#e2e5eb]">
          <button
            type="submit"
            disabled={createProductMutation.isPending}
            className="w-full h-[54px] bg-[#ca1d13] rounded-[5px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-white text-[18px] font-pretendard font-semibold tracking-[-0.18px]">
              {createProductMutation.isPending ? "등록 중..." : "상품 등록하기"}
            </span>
          </button>
        </div>
      </div>
    </AppScreen>
  );
};

export default Form;
