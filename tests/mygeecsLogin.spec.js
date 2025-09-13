import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.staging-student.mygeecs.com/');
  await expect(page.locator('form')).toContainText('Forgot your password');
  await expect(page.locator('body')).toContainText('Register as a Student');  
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('kiksmygeecs@yopmail.com');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Beatrice23@');
  await expect(page.getByText('Login', { exact: true })).toBeVisible();
  
  await page.getByRole('button', { name: 'Sign In' }).click();
});