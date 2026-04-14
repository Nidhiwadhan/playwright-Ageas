import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../utils/testData';

test('shopping flow @smoke', async ({ page }) => {

  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.open();
  await login.login(users.valid.username, users.valid.password);

  await inventory.addItem();

  const count = await inventory.getCartCount();
  await expect(count).toBe('1');

  await inventory.openCart();

  await page.click('[data-test="checkout"]');

  await page.fill('[data-test="firstName"]', 'Test');
  await page.fill('[data-test="lastName"]', 'User');
  await page.fill('[data-test="postalCode"]', '12345');

  await page.click('[data-test="continue"]');
  await page.click('[data-test="finish"]');

  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
});

test('Remove item from cart', async ({ page }) => {

  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.open();
  await login.login(users.valid.username, users.valid.password);

  await inventory.addItem();

  const count = await inventory.getCartCount();
  await expect(count).toBe('1');

  await inventory.openCart();

  await page.click('text=Remove');

  // Assert: Cart state updates correctly
  await expect(page.locator('.cart-count')).toHaveCount(0);
  // Optional stronger assertions (recommended)
    await page.getByText("Open Menu").click();
    await page.getByRole('link', { name: 'Logout' }).click();

});
