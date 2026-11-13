import { test, expect } from '@playwright/test'

test('portfolio content and responsive navigation work', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Kun Vinthien', level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Featured Work' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'View My Projects' })).toHaveAttribute('href', '#projects')

  await page.setViewportSize({ width: 390, height: 844 })
  for (const regionName of ['Skills', 'Featured Work']) {
    const carousel = page.getByRole('region', { name: regionName, exact: true })
    await expect
      .poll(() =>
        carousel.evaluate((element) => ({
          hasOverflow: element.scrollWidth > element.clientWidth,
          snapType: getComputedStyle(element).scrollSnapType,
        })),
      )
      .toEqual({ hasOverflow: true, snapType: 'x mandatory' })
  }

  await page.setViewportSize({ width: 768, height: 1024 })
  const tabletProjects = page.getByRole('region', { name: 'Featured Work', exact: true })
  await expect
    .poll(() =>
      tabletProjects.evaluate((element) => ({
        columns: getComputedStyle(element).gridTemplateColumns.split(' ').length,
        hasHorizontalOverflow: element.scrollWidth > element.clientWidth,
      })),
    )
    .toEqual({ columns: 2, hasHorizontalOverflow: false })

  await page.setViewportSize({ width: 390, height: 844 })
  const firstProject = page.locator('.project-card').first()
  const readMoreButton = firstProject.getByRole('button', { name: 'Read more' })
  await expect(readMoreButton).toHaveAttribute('aria-expanded', 'false')
  await readMoreButton.click()
  await expect(firstProject.getByRole('button', { name: 'Show less' })).toHaveAttribute(
    'aria-expanded',
    'true',
  )
  await firstProject.getByRole('button', { name: 'Show less' }).click()

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' })
  const firstNavigationLink = mobileNavigation.getByRole('link').first()
  const lastNavigationControl = mobileNavigation.getByRole('button').last()
  await expect(firstNavigationLink).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(lastNavigationControl).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(firstNavigationLink).toBeFocused()
  await mobileNavigation.getByRole('link', { name: 'Projects' }).click()

  await expect(page).toHaveURL(/#projects$/)
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
    )
    .toBe(true)
})

test('real project screenshots load with descriptive alt text', async ({ page }) => {
  await page.goto('/')
  const previews = page.locator('.project-artwork-real img')
  await expect(previews).toHaveCount(3)

  for (const preview of await previews.all()) {
    await preview.scrollIntoViewIfNeeded()
    await expect
      .poll(() => preview.evaluate((image) => image.complete && image.naturalWidth > 0))
      .toBe(true)
    await expect(preview).toHaveAttribute('alt', /Project preview/)
  }
})

test('project cards expose working demo and source links', async ({ page }) => {
  await page.goto('/')
  const expectedLinks = [
    {
      demo: 'https://khmaket.vercel.app',
      repo: 'https://github.com/kunvinthien-cyber/smart-khmer-frontend',
    },
    {
      demo: 'https://pos-system-l7b1.onrender.com',
      repo: 'https://github.com/kunvinthien-cyber/POS-SYSTEM',
    },
    {
      demo: 'https://chill-study-cam-pro.vercel.app',
      repo: 'https://github.com/kunvinthien-cyber/ChillStudyCam_Pro',
    },
    {
      demo: 'https://thienweb.vercel.app',
      repo: 'https://github.com/kunvinthien-cyber/Portfolio',
    },
  ]

  const projectCards = page.locator('.project-card')
  await expect(projectCards).toHaveCount(expectedLinks.length)

  for (const [index, links] of expectedLinks.entries()) {
    const projectCard = projectCards.nth(index)
    await expect(projectCard.getByRole('link', { name: 'Live Demo' })).toHaveAttribute('href', links.demo)
    await expect(projectCard.getByRole('link', { name: 'Source Code' })).toHaveAttribute('href', links.repo)
  }
})

test('scroll reveals update when reduced-motion preference changes', async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem('portfolio-motion'))
  await page.goto('/')
  const portfolio = page.locator('.portfolio')
  await expect(portfolio).toHaveClass(/reveal-ready/)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(portfolio).not.toHaveClass(/reveal-ready/)
  await expect
    .poll(() =>
      page.locator('.project-card').first().evaluate((element) => getComputedStyle(element).opacity),
    )
    .toBe('1')

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(portfolio).toHaveClass(/reveal-ready/)
})

test('motion control enables animations when reduced motion is preferred', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.addInitScript(() => localStorage.removeItem('portfolio-motion'))
  await page.goto('/')

  const portfolio = page.locator('.portfolio')
  await expect(portfolio).toHaveClass(/motion-enabled/)
  await page.getByRole('button', { name: 'Disable animations' }).click()
  await expect(portfolio).not.toHaveClass(/motion-enabled/)
  await expect(portfolio).not.toHaveClass(/reveal-ready/)

  await page.getByRole('button', { name: 'Enable animations' }).click()

  await expect(portfolio).toHaveClass(/motion-enabled/)
  await expect(portfolio).toHaveClass(/reveal-ready/)
  await page.locator('#about').scrollIntoViewIfNeeded()
  await expect(page.locator('#about')).toHaveClass(/is-visible/)
  await expect(page.locator('#about')).toHaveCSS('animation-name', 'scroll-section-enter')
  await expect(page.locator('#about')).toHaveCSS('transition-duration', '0.56s')

  const skillsTrack = page.locator('.skills-marquee-track')
  const marqueePrecedesAbout = await page
    .locator('.skills-marquee')
    .evaluate((marquee) =>
      Boolean(
        marquee.compareDocumentPosition(document.querySelector('#about')) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    )
  expect(marqueePrecedesAbout).toBe(true)
  await expect(skillsTrack).toHaveCSS('animation-name', 'skills-marquee')
  const firstFrame = await skillsTrack.evaluate((element) => getComputedStyle(element).transform)
  await page.waitForTimeout(150)
  const nextFrame = await skillsTrack.evaluate((element) => getComputedStyle(element).transform)
  expect(nextFrame).not.toBe(firstFrame)
})

test('navigation hides on downward scroll and reappears upward near the top', async ({ page }) => {
  await page.goto('/')
  const header = page.locator('.hero-nav')

  await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }))
  await expect(header).toHaveClass(/nav-hidden/)

  await page.evaluate(() => window.scrollTo({ top: 450, behavior: 'instant' }))
  await expect(header).not.toHaveClass(/nav-hidden/)

  await page.evaluate(() => window.scrollTo({ top: 520, behavior: 'instant' }))
  await expect(header).toHaveClass(/nav-hidden/)

  await page.evaluate(() => window.scrollTo({ top: 50, behavior: 'instant' }))
  await expect(header).not.toHaveClass(/nav-hidden/)
})

test('about section animates again when scrolling back to it', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto'
  })

  const about = page.locator('#about')
  const aboutCopy = about.locator('.about-copy')
  await about.scrollIntoViewIfNeeded()
  await expect(about).toHaveClass(/is-visible/)
  await expect.poll(() => aboutCopy.evaluate((element) => getComputedStyle(element).opacity)).toBe('1')

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect(about).not.toHaveClass(/is-visible/)
  await expect.poll(() => aboutCopy.evaluate((element) => getComputedStyle(element).opacity)).toBe('0')

  await about.scrollIntoViewIfNeeded()
  await expect(about).toHaveClass(/is-visible/)
  await expect.poll(() => aboutCopy.evaluate((element) => getComputedStyle(element).opacity)).toBe('1')

  const skills = page.locator('#skills')
  await skills.scrollIntoViewIfNeeded()
  await expect(skills).toHaveClass(/is-visible/)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect(skills).not.toHaveClass(/is-visible/)
  await skills.scrollIntoViewIfNeeded()
  await expect(skills).toHaveClass(/is-visible/)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.portfolio')).not.toHaveClass(/reveal-ready/)
  await expect.poll(() => aboutCopy.evaluate((element) => getComputedStyle(element).opacity)).toBe('1')
})

test('project cards respond to mouse movement with 3D tilt and glare', async ({ page }) => {
  await page.goto('/')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const card = page.locator('.project-3d-card').first()
  await card.scrollIntoViewIfNeeded()
  const bounds = await card.boundingBox()
  expect(bounds).not.toBeNull()

  await page.mouse.move(bounds.x + bounds.width * 0.85, bounds.y + bounds.height * 0.2)
  await expect
    .poll(() => card.evaluate((element) => element.style.getPropertyValue('--card-rotate-x')))
    .not.toBe('0deg')
  await expect
    .poll(() => card.evaluate((element) => element.style.getPropertyValue('--card-rotate-y')))
    .not.toBe('0deg')
  await expect
    .poll(() =>
      card.evaluate((element) => getComputedStyle(element.querySelector('.project-card-glare')).opacity),
    )
    .toBe('0.65')
  await expect
    .poll(() => card.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe('none')
  await expect
    .poll(() =>
      card.evaluate((element) => getComputedStyle(element.querySelector('.project-card-art')).transform),
    )
    .not.toBe('none')
  await card.getByRole('button', { name: 'Read more' }).click()
  await expect(card.getByRole('button', { name: 'Show less' })).toHaveAttribute('aria-expanded', 'true')
  await card.getByRole('button', { name: 'Show less' }).click()
})

test('desktop project stack scales with the next card on scroll in either direction', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const cards = page.locator('.project-carousel-card')
  const firstCard = cards.first()
  const progressbar = page.getByRole('progressbar', { name: 'Featured Work' })
  await page.locator('#projects').scrollIntoViewIfNeeded()
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto'
  })

  const nextCardStart = await cards.nth(1).evaluate((element) => {
    const track = element.parentElement
    const trackTop = track.getBoundingClientRect().top + window.scrollY
    const trackPadding = Number.parseFloat(getComputedStyle(track).paddingTop) || 0
    const previousCardHeight = element.previousElementSibling.offsetHeight
    return trackTop + trackPadding + previousCardHeight - (window.innerHeight - 250)
  })
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), nextCardStart)
  await expect
    .poll(() =>
      firstCard.evaluate((element) => Number.parseFloat(element.style.getPropertyValue('--stack-scale'))),
    )
    .toBeGreaterThan(0.95)
  await expect
    .poll(() =>
      firstCard.evaluate((element) => Number.parseFloat(element.style.getPropertyValue('--stack-scale'))),
    )
    .toBeLessThan(1)
  const firstProgress = Number(await progressbar.getAttribute('aria-valuenow'))

  const firstScale = await firstCard.evaluate((element) =>
    Number.parseFloat(element.style.getPropertyValue('--stack-scale')),
  )

  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'instant' }))
  await expect
    .poll(() =>
      firstCard.evaluate((element) => Number.parseFloat(element.style.getPropertyValue('--stack-scale'))),
    )
    .toBeLessThan(firstScale)
  await expect
    .poll(() => progressbar.getAttribute('aria-valuenow').then(Number))
    .toBeGreaterThan(firstProgress)
  const deeperProgress = Number(await progressbar.getAttribute('aria-valuenow'))
  const deeperScale = await firstCard.evaluate((element) =>
    Number.parseFloat(element.style.getPropertyValue('--stack-scale')),
  )

  await page.evaluate(() => window.scrollBy({ top: -200, behavior: 'instant' }))
  await expect
    .poll(() =>
      firstCard.evaluate((element) => Number.parseFloat(element.style.getPropertyValue('--stack-scale'))),
    )
    .toBeGreaterThan(deeperScale)
  await expect
    .poll(() => progressbar.getAttribute('aria-valuenow').then(Number))
    .toBeLessThan(deeperProgress)
})

test('hero canvas keeps animating with reduced motion enabled', async ({ page }) => {
  await page.goto('/')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const canvas = page.locator('.hero-canvas')
  await expect(canvas).toBeVisible()

  const firstFrame = await canvas.screenshot()
  await page.waitForTimeout(500)
  const nextFrame = await canvas.screenshot()

  expect(nextFrame).not.toEqual(firstFrame)
})

test('responsive layouts stay within viewport and preserve their expected card layouts', async ({
  page,
}) => {
  await page.goto('/')

  for (const width of [360, 375, 390, 414]) {
    await page.setViewportSize({ width, height: 844 })
    const layout = await page.evaluate(() => {
      const getTrackState = (selector) => {
        const track = document.querySelector(selector)
        const state = {
          overflow: track.scrollWidth > track.clientWidth,
          snap: getComputedStyle(track).scrollSnapType,
        }
        track.scrollTo({ left: track.scrollWidth, behavior: 'instant' })
        state.scrolls = track.scrollLeft > 0
        track.scrollTo({ left: 0, behavior: 'instant' })
        return state
      }

      return {
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        projectTrack: getTrackState('.project-carousel'),
        skillsTrack: getTrackState('.skills-carousel'),
      }
    })

    expect(layout.documentWidth, `document overflow at ${width}px`).toBeLessThanOrEqual(
      layout.viewportWidth,
    )
    expect(layout.projectTrack).toEqual({ overflow: true, snap: 'x mandatory', scrolls: true })
    expect(layout.skillsTrack).toEqual({ overflow: true, snap: 'x mandatory', scrolls: true })

    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
      )
      .toBe(true)
    await page.keyboard.press('Escape')
    await expect(page.locator('#mobile-navigation')).toBeHidden()
  }

  for (const width of [768, 820, 1024]) {
    await page.setViewportSize({ width, height: 1024 })
    const layout = await page.evaluate(() => {
      const projects = document.querySelector('.project-carousel')
      const shell = document.querySelector('.hero-nav')
      const brand = shell.querySelector(':scope > a')
      const navigation = shell.querySelector('nav:not(#mobile-navigation)')
      const controls = shell.querySelector(':scope > div')
      const boxes = [brand, navigation, controls].map((element) => {
        const { left, right, width } = element.getBoundingClientRect()
        return { left, right, width }
      })

      return {
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        columns: getComputedStyle(projects).gridTemplateColumns.split(' ').length,
        controlsWrap: getComputedStyle(controls).flexWrap,
        boxes,
      }
    })

    expect(layout.documentWidth, `document overflow at ${width}px`).toBeLessThanOrEqual(
      layout.viewportWidth,
    )
    expect(layout.columns).toBe(2)
    expect(layout.controlsWrap).toBe('nowrap')
    if (width >= 1024) {
      expect(layout.boxes[0].right).toBeLessThanOrEqual(layout.boxes[1].left + 1)
      expect(layout.boxes[1].right).toBeLessThanOrEqual(layout.boxes[2].left + 1)
    }
  }

  for (const width of [1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 })
    const layout = await page.evaluate(() => {
      const shell = document.querySelector('.section-shell').getBoundingClientRect()
      return {
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        sectionWidth: shell.width,
        centered: Math.abs(
          shell.left + shell.width / 2 - document.documentElement.clientWidth / 2,
        ) < 2,
      }
    })

    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
    expect(layout.sectionWidth).toBeLessThanOrEqual(1152)
    expect(layout.centered).toBe(true)
  }
})

test('language and theme switches preserve readable responsive content', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'dark'))
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  const mobileNavigation = page.locator('#mobile-navigation')
  await mobileNavigation.getByRole('button', { name: 'Khmer' }).click()
  const darkTheme = await page.locator('.project-card').first().evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    heading: getComputedStyle(document.querySelector('.section-title')).color,
  }))

  await expect(page.locator('.portfolio')).toHaveAttribute('lang', 'km')
  await expect(page.locator('.portfolio')).toHaveClass(/font-khmer/)
  await expect(page.getByRole('heading', { name: /ខ្ញុំបង្កើតកម្មវិធីវេបសាយ/ })).toBeVisible()
  const khmerStyles = await page.locator('.portfolio').evaluate((element) => ({
    fontFamily: getComputedStyle(element).fontFamily,
    projectCardWidth: element.querySelector('.project-card').getBoundingClientRect().width,
    viewportWidth: document.documentElement.clientWidth,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }))
  expect(khmerStyles.fontFamily).toContain('Kantumruy Pro')
  expect(khmerStyles.projectCardWidth).toBeLessThanOrEqual(khmerStyles.viewportWidth)
  expect(khmerStyles.overflow).toBe(false)
  expect(khmerStyles.projectCardWidth).toBeGreaterThan(0)

  await mobileNavigation.getByRole('button', { name: 'រូបរាង: light' }).click()
  await expect(page.locator('.portfolio')).toHaveAttribute('data-theme', 'light')
  const lightPage = await page.locator('.portfolio').evaluate((element) =>
    getComputedStyle(element).getPropertyValue('--page').trim(),
  )
  await expect
    .poll(() =>
      page.locator('.project-card').first().evaluate((element) => getComputedStyle(element).backgroundColor),
    )
    .toBe('rgba(255, 255, 255, 0.78)')
  const lightTheme = await page.locator('.project-card').first().evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    heading: getComputedStyle(document.querySelector('.section-title')).color,
  }))
  expect(lightPage).toBe('#f4f7fb')
  expect(lightTheme.background).not.toBe(darkTheme.background)
  expect(lightTheme.heading).not.toBe(darkTheme.heading)

  await mobileNavigation.getByRole('button', { name: 'English' }).click()
  await expect(page.locator('.portfolio')).toHaveAttribute('lang', 'en')
  await mobileNavigation.getByRole('button', { name: 'Theme: dark' }).click()
  await expect(page.locator('.portfolio')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Close navigation menu' }).click()

  await expect(page.locator('.portfolio')).not.toHaveClass(/font-khmer/)
  await expect(page.getByRole('heading', { name: 'Featured Work' })).toBeVisible()
})

test('project descriptions expand at mobile, tablet, and desktop widths', async ({ page }) => {
  await page.goto('/')
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    const firstProject = page.locator('.project-card').first()
    const readMoreButton = firstProject.getByRole('button', { name: 'Read more' })
    await readMoreButton.focus()
    await page.keyboard.press('Enter')
    await expect(firstProject.getByRole('button', { name: 'Show less' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    const showLessButton = firstProject.getByRole('button', { name: 'Show less' })
    await showLessButton.focus()
    await page.keyboard.press('Enter')
    await expect(firstProject.getByRole('button', { name: 'Read more' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  }
})

test('direct contact route renders translated content without Vue warnings', async ({ page }) => {
  const vueWarnings = []
  page.on('console', (message) => {
    if (message.type() === 'warning' && message.text().includes('[Vue warn]')) {
      vueWarnings.push(message.text())
    }
  })

  await page.goto('/contact')
  await expect(page.getByRole('heading', { name: "Let's build something useful together." })).toBeVisible()
  await expect(page.getByRole('link', { name: 'kunvinthien@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:kunvinthien@gmail.com',
  )
  expect(vueWarnings).toEqual([])

  await page.addInitScript(() => localStorage.setItem('portfolio-language', 'kh'))
  await page.goto('/contact')
  await expect(
    page.getByRole('heading', { name: /ចូរយើងបង្កើតអ្វីដែលមានប្រយោជន៍/ }),
  ).toBeVisible()
})
