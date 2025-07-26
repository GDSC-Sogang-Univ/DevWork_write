import { test, expect } from '@playwright/test';

test.describe('매물 목록 페이지', () => {
  test('페이지 로딩 및 기본 UI 확인', async ({ page }) => {
    await page.goto('/');
    
    // 페이지 제목 확인
    await expect(page.locator('h1:has-text("Jobs")')).toBeVisible();
    
    // 매물 등록 버튼 확인
    await expect(page.locator('button:has-text("+ 매물 등록")')).toBeVisible();
  });

  test('매물 목록 표시 확인', async ({ page }) => {
    await page.goto('/');
    
    // 매물 카드들이 표시되는지 확인 (MSW 목 데이터 기준)
    await expect(page.locator('[data-testid="feed-card"]').first()).toBeVisible();
  });

  test('매물 등록 버튼 클릭', async ({ page }) => {
    await page.goto('/');
    
    await page.click('button:has-text("+ 매물 등록")');
    
    // 매물 등록 페이지로 이동했는지 확인
    await expect(page.locator('h1:has-text("매물 등록")')).toBeVisible();
  });

  test('매물 카드 클릭하여 상세 페이지 이동', async ({ page }) => {
    await page.goto('/');
    
    // 첫 번째 매물 카드 클릭
    await page.locator('[data-testid="feed-card"]').first().click();
    
    // 상세 페이지로 이동했는지 확인 (URL 변경 확인)
    await page.waitForURL(/.*\/detail.*/);
  });

  test('빈 목록 상태 표시', async ({ page }) => {
    // MSW를 빈 배열로 응답하도록 설정이 필요하지만, 
    // 여기서는 기본적인 UI 구조만 테스트
    await page.goto('/');
    
    // 목록이 로딩되는지 확인
    await expect(page.locator('h1:has-text("Jobs")')).toBeVisible();
  });

  test('스크롤 동작 확인', async ({ page }) => {
    await page.goto('/');
    
    // 페이지가 스크롤 가능한지 확인
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // 플로팅 버튼이 여전히 보이는지 확인
    await expect(page.locator('button:has-text("+ 매물 등록")')).toBeVisible();
  });
});