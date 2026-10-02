import { handleChatRequest } from '../server/api/chat.post.ts'

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    })
  }

  let body: { messages?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  return handleChatRequest(body?.messages, process.env.GOOGLE_GENERATIVE_AI_API_KEY)
}
