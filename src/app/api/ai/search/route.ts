import { getEmbeddings } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return new NextResponse("Missing query", { status: 400 });
    }

    const embedding = await getEmbeddings(query);

    // Using raw SQL for vector similarity search with pgvector
    // We use <=> for cosine distance
    const products = await prisma.$queryRaw`
      SELECT id, name, description, price, images, "categoryId"
      FROM "Product"
      ORDER BY embedding <=> ${embedding}::vector
      LIMIT 8;
    `;

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
