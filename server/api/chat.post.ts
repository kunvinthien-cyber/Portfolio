import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { convertToModelMessages, streamText } from 'ai'
import { MY_PORTFOLIO_CONTEXT } from '../ai-context.js'

export async function handleChatRequest(
  messages: unknown,
  apiKey: string | undefined,
): Promise<Response> {
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'Send at least one chat message.' }, { status: 400 })
  }

  if (!apiKey) {
    return Response.json(
      { error: 'Chat is not configured. Set GOOGLE_GENERATIVE_AI_API_KEY on the server.' },
      { status: 503 },
    )
  }

  try {
    const google = createGoogleGenerativeAI({ apiKey })
    const result = await streamText({
      model: google('gemini-3.8-flash'),
      system: MY_PORTFOLIO_CONTEXT,
      messages: await convertToModelMessages(messages),
      maxRetries: 0,
    })

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error('Google Generative AI stream failed:', error)
        const message = error instanceof Error ? error.message : String(error)

        if (/quota|rate.?limit/i.test(message)) {
          return 'The AI request limit has been reached. Please wait and try again later.'
        }

        if (/high demand|unavailable|503/i.test(message)) {
          return 'The AI service is temporarily busy. Please try again shortly.'
        }

        return 'The assistant could not generate a response. Please try again later.'
      },
    })
  } catch (error) {
    console.error('Chat request failed:', error)
    return Response.json({ error: 'The assistant could not generate a response.' }, { status: 500 })
  }
}
