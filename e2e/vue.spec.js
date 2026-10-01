import { test, expect } from '@playwright/test'

test('portfolio content and responsive navigation work', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Kun Vinthien', level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Featured Work' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'View My Projects' })).toHaveAttribute('href', '#projects')

  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Projects' }).click()

  await expect(page).toHaveURL(/#projects$/)
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
    )
    .toBe(true)
})
