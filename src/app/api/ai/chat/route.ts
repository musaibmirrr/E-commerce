import { openai, getEmbeddings } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const lastMessage = messages[messages.length - 1].content;

    // Use semantic search to find relevant products for context
    const embedding = await getEmbeddings(lastMessage);
    const relevantProducts: any[] = await prisma.$queryRaw`
      SELECT name, description, price
      FROM "Product"
      ORDER BY embedding <=> ${embedding}::vector
      LIMIT 5;
    `;

    const productsContext = relevantProducts.map(p =>
      `${p.name} ($${p.price}): ${p.description.substring(0, 100)}...`
    ).join("\n");

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful shopping assistant for AIStore.
          Use the following contextually relevant products to help the user:
          ${productsContext}

          If you don't know the answer, just say you don't know.
          Keep your answers concise and professional.
          Mention specific products by name and price if they match the user's intent.`
        },
        ...messages
      ],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
