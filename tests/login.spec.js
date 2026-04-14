import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../utils/testData';

test('valid login @smoke', async ({ page }) => {

  const login = new LoginPage(page);
  await login.open();
  await login.login(users.valid.username, users.valid.password);
  await expect(page).toHaveURL(/inventory/);
});

test('invalid login', async ({ page }) => {

  const login = new LoginPage(page);
  await login.open();
  await login.login(users.invalid.username, users.invalid.password);
  await expect(await login.getError()).toBeVisible();

});