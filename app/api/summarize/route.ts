export async function POST(req: Request) {
  const body = await req.json();

  return Response.json({
    summary: body.text.slice(0, 60) + "...",
  });
}
