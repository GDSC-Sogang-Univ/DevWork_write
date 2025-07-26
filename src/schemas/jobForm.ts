import { z } from 'zod';

// 매물 등록 폼 스키마
export const jobFormSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요')
    .max(100, '제목은 100자 이내로 입력해주세요'),
  
  description: z
    .string()
    .min(10, '설명은 최소 10자 이상 입력해주세요')
    .max(1000, '설명은 1000자 이내로 입력해주세요'),
  
  price: z
    .number({
      required_error: '가격을 입력해주세요',
      invalid_type_error: '올바른 숫자를 입력해주세요',
    })
    .min(0, '가격은 0원 이상이어야 합니다')
    .max(99999999, '가격이 너무 큽니다'),
  
  region: z
    .string()
    .min(1, '지역을 선택해주세요'),
  
  category: z
    .string()
    .min(1, '카테고리를 선택해주세요'),
  
  contactNumber: z
    .string()
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호 형식이 아닙니다')
    .optional(),
  
  images: z
    .array(z.instanceof(File))
    .max(5, '이미지는 최대 5개까지 업로드 가능합니다')
    .optional(),
});

export type JobFormData = z.infer<typeof jobFormSchema>;

// 카테고리 옵션
export const categoryOptions = [
  { value: 'electronics', label: '전자기기' },
  { value: 'furniture', label: '가구' },
  { value: 'clothing', label: '의류' },
  { value: 'books', label: '도서' },
  { value: 'etc', label: '기타' },
] as const;

// 지역 옵션
export const regionOptions = [
  { value: 'seoul', label: '서울' },
  { value: 'gyeonggi', label: '경기' },
  { value: 'incheon', label: '인천' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'gwangju', label: '광주' },
  { value: 'daejeon', label: '대전' },
  { value: 'ulsan', label: '울산' },
  { value: 'etc', label: '기타' },
] as const;