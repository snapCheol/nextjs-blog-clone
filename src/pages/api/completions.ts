import { NextApiRequest, NextApiResponse } from 'next';
import OpenAi from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAi({
  apiKey: process.env.OPEN_API_KEY,
});

type CompletionResponse = {
  messages: ChatCompletionMessageParam[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompletionResponse>,
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const messages = req.body.messages as ChatCompletionMessageParam[];

  const response = await openai.chat.completions.create({
    messages,
    model: 'gpt-4-1106-preview',
  });

  messages.push(response.choices[0].message);

  res.status(200).json({ messages });
}
