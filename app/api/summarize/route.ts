import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { text } = await req.json();

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: `Summarize this note in one sentence: ${text}`,
  });

  return Response.json({
    summary: response.output[0].content[0].text,
  });
}
