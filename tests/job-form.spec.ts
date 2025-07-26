import { test, expect } from '@playwright/test';

test.describe('매물 등록 폼', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('text=+ 매물 등록');
    await expect(page.locator('h1:has-text("매물 등록")')).toBeVisible();
  });

  test('폼 필드가 올바르게 표시되는지 확인', async ({ page }) => {
    // 필수 필드들이 존재하는지 확인
    await expect(page.locator('input[placeholder="제목을 입력하세요"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder="상품에 대한 설명을 입력하세요"]')).toBeVisible();
    await expect(page.locator('input[type="number"]')).toBeVisible();
    await expect(page.locator('select').first()).toBeVisible(); // 카테고리
    await expect(page.locator('select').nth(1)).toBeVisible(); // 지역
    await expect(page.locator('input[placeholder="010-0000-0000"]')).toBeVisible();
  });

  test('필수 필드 유효성 검증', async ({ page }) => {
    // 빈 폼으로 제출 시도
    await page.click('button:has-text("매물 등록하기")');
    
    // 에러 메시지가 표시되는지 확인
    await expect(page.locator('text=제목을 입력해주세요')).toBeVisible();
    await expect(page.locator('text=설명은 최소 10자 이상 입력해주세요')).toBeVisible();
    await expect(page.locator('text=가격을 입력해주세요')).toBeVisible();
    await expect(page.locator('text=카테고리를 선택해주세요')).toBeVisible();
    await expect(page.locator('text=지역을 선택해주세요')).toBeVisible();
  });

  test('제목 길이 제한 검증', async ({ page }) => {
    const longTitle = 'a'.repeat(101);
    await page.fill('input[placeholder="제목을 입력하세요"]', longTitle);
    await page.blur();
    
    await expect(page.locator('text=제목은 100자 이내로 입력해주세요')).toBeVisible();
  });

  test('가격 입력 검증', async ({ page }) => {
    // 음수 입력
    await page.fill('input[type="number"]', '-100');
    await page.blur();
    await expect(page.locator('text=가격은 0원 이상이어야 합니다')).toBeVisible();
  });

  test('연락처 형식 검증', async ({ page }) => {
    // 잘못된 형식 입력
    await page.fill('input[placeholder="010-0000-0000"]', '123-456');
    await page.blur();
    await expect(page.locator('text=올바른 전화번호 형식이 아닙니다')).toBeVisible();
    
    // 올바른 형식 입력
    await page.fill('input[placeholder="010-0000-0000"]', '010-1234-5678');
    await page.blur();
    await expect(page.locator('text=올바른 전화번호 형식이 아닙니다')).not.toBeVisible();
  });

  test('모든 필드를 올바르게 입력하고 제출', async ({ page }) => {
    // 모든 필수 필드 입력
    await page.fill('input[placeholder="제목을 입력하세요"]', '테스트 매물');
    await page.fill('textarea[placeholder="상품에 대한 설명을 입력하세요"]', '이것은 테스트 매물 설명입니다. 최소 10자 이상입니다.');
    await page.fill('input[type="number"]', '50000');
    await page.selectOption('select >> nth=0', 'electronics');
    await page.selectOption('select >> nth=1', 'seoul');
    await page.fill('input[placeholder="010-0000-0000"]', '010-1234-5678');
    
    // 제출 버튼이 활성화되는지 확인
    const submitButton = page.locator('button:has-text("매물 등록하기")');
    await expect(submitButton).not.toBeDisabled();
    
    // 제출
    await submitButton.click();
    
    // 성공 알림 확인
    await expect(page.locator('text=매물이 등록되었습니다!')).toBeVisible();
  });

  test('뒤로가기 버튼 동작', async ({ page }) => {
    const backButton = page.locator('button[aria-label="뒤로 가기"], button:has-text("뒤로")').first();
    await backButton.click();
    
    // 메인 페이지로 돌아갔는지 확인
    await expect(page.locator('h1:has-text("Jobs")')).toBeVisible();
  });
});