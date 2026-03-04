import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:54630/login');
  await page.getByRole('textbox', { name: 'Enter your Name' }).click();
  await page.locator('body').click();
  await expect(page.getByText('The email is required')).toBeVisible();
  await expect(page.getByText('The password is required')).toBeVisible();
});