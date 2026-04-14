export class InventoryPage {
  constructor(page) {
    this.page = page;

    this.cartBadge = '.shopping_cart_badge';
    this.cart = '.shopping_cart_link';

    this.addBackpack = '[data-test="add-to-cart-sauce-labs-backpack"]';
    this.removeBackpack = '[data-test="remove-sauce-labs-backpack"]';

    this.sortDropdown = '[data-test="product-sort-container"]';
  }

  async addItem() {
    await this.page.click(this.addBackpack);
  }

  async removeItem() {
    await this.page.click(this.removeBackpack);
  }

async getCartCount() {
  return await this.page.locator('.shopping_cart_badge').textContent();
}

async openCart() {
    await this.page.click(this.cart);
  }

  async sort(option) {
    await this.page.selectOption(this.sortDropdown, option);
  }
}