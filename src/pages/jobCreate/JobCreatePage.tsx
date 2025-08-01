import { AppScreen } from "@stackflow/plugin-basic-ui";
import { styled } from "@linaria/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFormSchema, JobFormData, categoryOptions, regionOptions } from "@/schemas/jobForm";
import { useFlow } from "@/lib/stackflow";
import { FlexColumn, Flex1 } from "@/styles/f";
import { useState } from "react";

export const JobCreatePage = () => {
  const { pop } = useFlow();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      region: "",
      category: "",
      contactNumber: "",
    },
  });

  const onSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: API 호출
      console.log("Form data:", data);
      alert("매물이 등록되었습니다!");
      pop();
    } catch (error) {
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppScreen
      appBar={{
        title: "매물 등록",
        backButton: {
          onClick: () => pop(),
        },
      }}>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>제목 *</Label>
            <Input
              {...register("title")}
              placeholder="제목을 입력하세요"
              hasError={!!errors.title}
            />
            {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>설명 *</Label>
            <Textarea
              {...register("description")}
              placeholder="상품에 대한 설명을 입력하세요"
              rows={5}
              hasError={!!errors.description}
            />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>가격 *</Label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="가격을 입력하세요"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  hasError={!!errors.price}
                />
              )}
            />
            {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>카테고리 *</Label>
            <Select {...register("category")} hasError={!!errors.category}>
              <option value="">카테고리를 선택하세요</option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>지역 *</Label>
            <Select {...register("region")} hasError={!!errors.region}>
              <option value="">지역을 선택하세요</option>
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.region && <ErrorMessage>{errors.region.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>연락처</Label>
            <Input
              {...register("contactNumber")}
              placeholder="010-0000-0000"
              hasError={!!errors.contactNumber}
            />
            {errors.contactNumber && <ErrorMessage>{errors.contactNumber.message}</ErrorMessage>}
          </FormGroup>

          <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "등록 중..." : "매물 등록하기"}
          </SubmitButton>
        </Form>
      </FormWrapper>
    </AppScreen>
  );
};

// 스타일 컴포넌트
const FormWrapper = styled.div`
  ${FlexColumn}
  ${Flex1}
  padding: 20px;
  overflow-y: auto;
`;

const Form = styled.form`
  ${FlexColumn}
  gap: 24px;
`;

const FormGroup = styled.div`
  ${FlexColumn}
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.hasError ? "#ff4444" : "#e0e0e0")};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ff4444" : "#000")};
  }
`;

const Textarea = styled.textarea<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.hasError ? "#ff4444" : "#e0e0e0")};
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ff4444" : "#000")};
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.hasError ? "#ff4444" : "#e0e0e0")};
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ff4444" : "#000")};
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #ff4444;
`;

const SubmitButton = styled.button`
  padding: 16px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 16px;

  &:hover:not(:disabled) {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
