import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { text } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Summarize this note shortly." },
      { role: "user", content: text },
    ],
  });

  return Response.json({
    summary: response.choices[0].message.content,
  });
}
// export async function POST(req: Request) {
//   const { text } = await req.json();

//   return Response.json({
//     summary: "AI summary of: " + text,
//   });
// }
