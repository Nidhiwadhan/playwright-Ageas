import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../utils/testData';

test('sort products low to high', async ({ page }) => {

  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.open();
  await login.login(users.valid.username, users.valid.password);

  await inventory.sort('lohi');
const prices = await page.locator('.inventory_item_price').allTextContents();
  const priceNumbers = prices.map(p => parseFloat(p.replace('$', '')));

  const sortedPrices = [...priceNumbers].sort((a, b) => a - b);

  await expect(priceNumbers).toEqual(sortedPrices);
  await expect(page).toBeTruthy(); // simple sanity check
});

