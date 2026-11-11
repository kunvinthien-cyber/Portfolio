import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import test from 'node:test'
import { handleChatRequest, isChatRateLimited } from './chat.js'

test('uses the existing Groq model, bounded history, and selected response language', async (t) => {
  const originalFetch = globalThis.fetch
  let requestBody
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.groq.com/openai/v1/chat/completions')
    assert.equal(options.headers.Authorization, 'Bearer server-only-test-key')
    requestBody = JSON.parse(options.body)
    return new Response(JSON.stringify({ choices: [{ message: { content: 'ចម្លើយសាកល្បង' } }] }), {
      status: 200,
    })
  }
  t.after(() => {
    globalThis.fetch = originalFetch
  })

  const response = await handleChatRequest(
    [
      { role: 'user', content: 'Who is Vinthien?' },
      { role: 'assistant', content: 'He is a junior web developer.' },
      { role: 'user', content: 'Unanswered message from a previous failed request.' },
    ],
    'server-only-test-key',
    'What about his education?',
    'kh',
  )

  assert.equal(response.status, 200)
  assert.equal((await response.json()).reply, 'ចម្លើយសាកល្បង')
  assert.equal(requestBody.model, 'openai/gpt-oss-120b')
  assert.equal(requestBody.max_completion_tokens, 400)
  assert.match(requestBody.messages[0].content, /natural, professional Khmer/)
  assert.match(requestBody.messages[0].content, /individual contributions are not documented/)
  assert.match(requestBody.messages[0].content, /source materials have inconsistent date ranges/)
  assert.deepEqual(requestBody.messages.slice(1), [
    { role: 'user', content: 'Who is Vinthien?' },
    { role: 'assistant', content: 'He is a junior web developer.' },
    { role: 'user', content: 'What about his education?' },
  ])
})

test('bounds history cost and sends only complete user-assistant turns', async (t) => {
  const originalFetch = globalThis.fetch
  let requestBody
  globalThis.fetch = async (_url, options) => {
    requestBody = JSON.parse(options.body)
    return new Response(JSON.stringify({ choices: [{ message: { content: 'Ready.' } }] }), {
      status: 200,
    })
  }
  t.after(() => {
    globalThis.fetch = originalFetch
  })

  const history = Array.from({ length: 5 }, (_, index) => [
    { role: 'user', content: `Question ${index} ${'q'.repeat(990)}` },
    { role: 'assistant', content: `Answer ${index} ${'a'.repeat(990)}` },
  ]).flat()
  history.push({ role: 'user', content: 'An incomplete previous turn.' })

  const response = await handleChatRequest(history, 'server-only-test-key', 'Current question.')

  assert.equal(response.status, 200)
  const sentHistory = requestBody.messages.slice(1, -1)
  assert.equal(sentHistory.length, 6)
  assert.ok(sentHistory.reduce((total, item) => total + item.content.length, 0) <= 6000)
  for (let index = 0; index < sentHistory.length; index += 2) {
    assert.equal(sentHistory[index].role, 'user')
    assert.equal(sentHistory[index + 1].role, 'assistant')
  }
  assert.equal(
    sentHistory.some((item) => item.content.includes('incomplete previous turn')),
    false,
  )
})

test('provides verified knowledge for detailed questions about every project in English and Khmer', async (t) => {
  const originalFetch = globalThis.fetch
  const requests = []
  globalThis.fetch = async (_url, options) => {
    requests.push(JSON.parse(options.body))
    return new Response(
      JSON.stringify({ choices: [{ message: { content: 'Grounded response.' } }] }),
      {
        status: 200,
      },
    )
  }
  t.after(() => {
    globalThis.fetch = originalFetch
  })

  const questions = [
    { language: 'en', text: 'How did Vinthien build ChillStudy Cambodia?' },
    { language: 'en', text: 'What technologies did he use?' },
    { language: 'en', text: 'How does the frontend communicate with the backend?' },
    { language: 'en', text: 'What database does the project use?' },
    { language: 'en', text: 'What are the main features?' },
    { language: 'en', text: 'What was his contribution?' },
    { language: 'en', text: 'What challenges did he face?' },
    { language: 'kh', text: 'សូមពន្យល់អំពីស្ថាបត្យកម្មគម្រោងជាភាសាខ្មែរ។' },
  ]

  for (const question of questions) {
    const response = await handleChatRequest(
      [],
      'server-only-test-key',
      question.text,
      question.language,
    )
    assert.equal(response.status, 200)
    assert.equal((await response.json()).reply, 'Grounded response.')
  }

  assert.equal(requests.length, questions.length)
  for (const [index, request] of requests.entries()) {
    const systemPrompt = request.messages[0].content
    assert.equal(request.messages.at(-1).content, questions[index].text)
    assert.match(systemPrompt, /PROJECT KNOWLEDGE/)
    assert.match(systemPrompt, /KhMaket/)
    assert.match(systemPrompt, /Khmer POS System/)
    assert.match(systemPrompt, /ChillStudy Cambodia/)
    assert.match(systemPrompt, /Personal Portfolio/)
    assert.match(systemPrompt, /do not fill gaps with common patterns/i)
    assert.match(systemPrompt, /A screenshot or public app shell does not prove a feature works/)
    assert.match(
      systemPrompt,
      new RegExp(
        questions[index].language === 'kh'
          ? 'natural, professional Khmer'
          : 'natural, professional English',
      ),
    )
  }
})

test('rejects missing and oversized messages without calling Groq', async () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = async () => {
    assert.fail('Groq must not be called for invalid messages.')
  }
  try {
    assert.equal((await handleChatRequest([], 'test-key', '  ')).status, 400)
    assert.equal((await handleChatRequest([], 'test-key', 'x'.repeat(2001))).status, 400)
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('returns a safe error when Groq rate limits the request', async (t) => {
  const originalFetch = globalThis.fetch
  const originalConsoleError = console.error
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: 'private provider diagnostic' } }), {
      status: 429,
    })
  console.error = () => {}
  t.after(() => {
    globalThis.fetch = originalFetch
    console.error = originalConsoleError
  })

  const response = await handleChatRequest([], 'server-only-test-key', 'Tell me about ChillStudy')
  const body = await response.text()
  assert.equal(response.status, 429)
  assert.match(body, /too many requests/i)
  assert.doesNotMatch(body, /private provider diagnostic|server-only-test-key/)
})

test('limits each client to twelve requests per minute', () => {
  const clientId = randomUUID()
  for (let request = 0; request < 12; request += 1) {
    assert.equal(isChatRateLimited(clientId, 1000), false)
  }
  assert.equal(isChatRateLimited(clientId, 1000), true)
  assert.equal(isChatRateLimited(clientId, 61_000), false)
})
