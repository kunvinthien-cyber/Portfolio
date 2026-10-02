import { createServer } from 'node:http'
import { handleChatRequest } from './api/chat.js'

const port = Number(process.env.API_PORT || 3001)
const maxBodyBytes = 32 * 1024

const sendJson = (response, status, body) => {
  response.writeHead(status, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(body))
}

const server = createServer(async (request, response) => {
  if (request.url?.split('?')[0] !== '/api/chat') {
    response.writeHead(404)
    response.end('Not Found')
    return
  }

  if (request.method !== 'POST') {
    response.writeHead(405, { Allow: 'POST' })
    response.end('Method Not Allowed')
    return
  }

  const chunks = []
  let bodyBytes = 0

  try {
    for await (const chunk of request) {
      bodyBytes += chunk.length
      if (bodyBytes > maxBodyBytes) {
        sendJson(response, 413, { error: 'Request body is too large.' })
        return
      }
      chunks.push(chunk)
    }

    let body
    try {
      body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    } catch {
      sendJson(response, 400, { error: 'Request body must be valid JSON.' })
      return
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      sendJson(response, 400, { error: 'Request body must be a JSON object.' })
      return
    }

    const history = Array.isArray(body.history)
      ? body.history
      : Array.isArray(body.messages)
        ? body.messages
        : []
    const result = await handleChatRequest(
      history,
      process.env.GROQ_API_KEY,
      typeof body.message === 'string' ? body.message : undefined,
    )

    response.writeHead(result.status, Object.fromEntries(result.headers))
    response.end(await result.text())
  } catch (error) {
    console.error('Local chat API error:', error)
    if (!response.headersSent) {
      sendJson(response, 500, { error: 'Unable to process your message.' })
    } else {
      response.destroy(error)
    }
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Local chat API listening on http://127.0.0.1:${port}`)
})

server.on('error', (error) => {
  console.error(`Unable to start the local chat API on port ${port}:`, error.message)
  process.exitCode = 1
})
