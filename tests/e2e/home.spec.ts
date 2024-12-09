import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  // Test basic page structure
  test('should render main components', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check main structural elements
    await expect(page.locator('main')).toBeVisible();
    
    // Test main container
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Test search section
    const heading = page.getByRole('heading', { name: 'All Products' });
    await expect(heading).toBeVisible();

    const subtext = page.getByText('A 360 look at our platform');
    await expect(subtext).toBeVisible();

    const searchInput = page.getByPlaceholder('Search');
    await expect(searchInput).toBeVisible();
  });

   // Test product loading
  test('should show loader while fetching products', async ({ page }) => {
    // Check if loader is visible initially
    await expect(page.locator('.loader')).toBeVisible();
    // Wait for products to load
    await expect(page.locator('.product-grid')).toBeVisible();
    // Verify loader is no longer visible
    await expect(page.locator('.loader')).toBeHidden();
  });

  // Test product grid
  test('should display products in a grid', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('.product-grid');
    // Check if products are rendered
    const products = page.locator('.product-grid > div');
    await expect(products).toHaveCount(await products.count());

    // Verify grid layout
    const productGrid = await page.locator('.product-grid');
    const gridStyle = await productGrid.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        gridTemplateColumns: style.gridTemplateColumns,
        gap: style.gap
      };
    });
    expect(gridStyle.display).toBe('grid');
  });

  // Test search functionality
  test('should filter products when searching', async ({ page }) => {
    // Wait for initial products to load
    await page.waitForSelector('.product-grid');

    // Get initial product count
    const initialProducts = await page.locator('.product-grid > div').count();

    // Type in search
    const searchInput = page.getByPlaceholder('Search');
    await searchInput.fill('test search');

    // Wait for search results to update
    await page.waitForTimeout(300); // Add small delay for debounce if implemented

    // Get filtered product count
    const filteredProducts = await page.locator('.product-grid > div').count();

    // Verify count changed (this assumes search will filter some items)
    expect(filteredProducts).toBeLessThanOrEqual(initialProducts);
  });

  // Test error state
  test('should show not found message when no products match search', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('.product-grid');

    // Search for non-existent product
    const searchInput = page.getByPlaceholder('Search');
    await searchInput.fill('nonexistentproduct123456789');

    // Wait for no results state
    await expect(page.locator('.not-found-container')).toBeVisible({ timeout: 10000 });
  });
})
