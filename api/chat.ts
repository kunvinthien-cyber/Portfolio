import { Readable } from 'node:stream'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { getChatClientId, handleChatRequest, isChatRateLimited } from '../server/api/chat.js'

type VercelRequest = IncomingMessage & { body?: unknown }

export default async function handler(request: VercelRequest, response: ServerResponse) {
  if (request.method !== 'POST') {
    response.statusCode = 405
    response.setHeader('Allow', 'POST')
    response.end('Method Not Allowed')
    return
  }

  if (isChatRateLimited(getChatClientId(request))) {
    response.statusCode = 429
    response.setHeader('Cache-Control', 'no-store')
    response.setHeader('Content-Type', 'application/json')
    response.setHeader('Retry-After', '60')
    response.end(
      JSON.stringify({ error: 'Too many requests. Please wait a moment and try again.' }),
    )
    return
  }

  let body: unknown = request.body
  try {
    if (typeof body === 'string' || Buffer.isBuffer(body)) {
      body = JSON.parse(body.toString())
    }
  } catch {
    response.statusCode = 400
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify({ error: 'Request body must be valid JSON.' }))
    return
  }

  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    response.statusCode = 400
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify({ error: 'Request body must be a JSON object.' }))
    return
  }

  if (JSON.stringify(body).length > 32 * 1024) {
    response.statusCode = 413
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify({ error: 'Request body is too large.' }))
    return
  }

  const result = await handleChatRequest(
    (body as { messages?: unknown; history?: unknown }).messages ??
      (body as { history?: unknown }).history ??
      [],
    process.env.GROQ_API_KEY,
    typeof (body as { message?: unknown }).message === 'string'
      ? (body as { message: string }).message
      : undefined,
    (body as { language?: unknown }).language === 'kh' ? 'kh' : 'en',
  )
  response.setHeader('Cache-Control', 'no-store')
  response.statusCode = result.status
  result.headers.forEach((value, name) => response.setHeader(name, value))
  if (result.body) Readable.fromWeb(result.body).pipe(response)
  else response.end()
}
