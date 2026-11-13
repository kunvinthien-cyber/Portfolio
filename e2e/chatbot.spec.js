import { expect, test } from '@playwright/test'

test('English conversations retain context and the assistant admits unknown details', async ({
  page,
}) => {
  const requests = []
  const pageErrors = []
  const consoleErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'dark'))
  await page.route('**/api/chat', async (route) => {
    requests.push(route.request().postDataJSON())
    const reply =
      requests.length === 1
        ? 'ChillStudy Cambodia is a study-focused project. The portfolio lists Vue.js and Tailwind CSS.'
        : requests.length === 2
          ? 'The listed stack is Vue.js and Tailwind CSS.'
          : 'I do not have verified information about that.'
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ reply }),
    })
  })

  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open AI portfolio assistant' }).click()
  await expect(page.locator('.chatbot')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'What is documented about ChillStudy Cambodia?' }).click()
  await expect(page.getByText(/study-focused project/i)).toBeVisible()

  const messageInput = page.locator('.chatbot').getByRole('textbox', { name: 'Your message' })
  await messageInput.fill('What about its stack?')
  await messageInput.press('Enter')
  await expect(page.getByText('The listed stack is Vue.js and Tailwind CSS.')).toBeVisible()

  await messageInput.fill('Does he have ten years of professional developer experience?')
  await messageInput.press('Enter')
  await expect(page.getByText('I do not have verified information about that.')).toBeVisible()

  expect(requests).toHaveLength(3)
  expect(requests[0].language).toBe('en')
  expect(requests[1].history).toEqual([
    { role: 'user', content: 'What is documented about ChillStudy Cambodia?' },
    {
      role: 'assistant',
      content:
        'ChillStudy Cambodia is a study-focused project. The portfolio lists Vue.js and Tailwind CSS.',
    },
  ])
  expect(requests[2].history).toHaveLength(4)
  await page.getByRole('button', { name: 'Close chat' }).click()
  await expect(page.locator('.chat-panel')).toBeHidden()
  await page.getByRole('button', { name: 'Open AI portfolio assistant' }).click()
  await expect(page.locator('.chat-panel')).toBeVisible()
  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test('Khmer chat handles rate limits and provider failures responsively in light theme', async ({
  page,
}) => {
  const requests = []
  const pageErrors = []
  const consoleErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  await page.addInitScript(() => {
    localStorage.setItem('portfolio-language', 'kh')
    localStorage.setItem('portfolio-theme', 'light')
  })
  await page.route('**/api/chat', async (route) => {
    requests.push(route.request().postDataJSON())
    await route.fulfill({
      status: requests.length === 1 ? 429 : 503,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Server detail must not be shown in the chat.' }),
    })
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'បើក AI Portfolio Assistant' }).click()
  await expect(page.locator('.chatbot')).toHaveAttribute('data-theme', 'light')
  await page.getByRole('button', { name: 'តើមានព័ត៌មានអ្វីខ្លះអំពី ChillStudy Cambodia?' }).click()
  await expect(page.getByRole('alert')).toContainText('អ្នកបានផ្ញើសំណើច្រើនពេក')

  const messageInput = page.locator('.chatbot').getByRole('textbox', { name: 'សាររបស់អ្នក' })
  await messageInput.fill('សូមប្រាប់អំពីការសិក្សារបស់គាត់')
  await messageInput.press('Enter')
  await expect(page.getByRole('alert')).toContainText('Assistant មិនអាចឆ្លើយបាន')
  expect(requests.every((request) => request.language === 'kh')).toBe(true)

  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 })
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        ),
      )
      .toBe(true)
  }

  await page.getByRole('button', { name: 'លុបការសន្ទនា' }).click()
  await expect(page.getByRole('button', { name: 'តើ Vinthien ជានរណា?' })).toBeVisible()
  expect(pageErrors).toEqual([])
  expect(
    consoleErrors.filter(
      (error) =>
        !error.includes('server responded with a status of 429') &&
        !error.includes('server responded with a status of 503'),
    ),
  ).toEqual([])
})
