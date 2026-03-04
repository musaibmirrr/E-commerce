import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getEmbeddings } from "@/lib/openai";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");

    const products = await prisma.product.findMany({
      where: {
        ...(categoryId ? { categoryId } : {}),
        ...(search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ]
        } : {}),
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, inventory, images, categoryId } = body;

    if (!name || !price || !categoryId) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        inventory,
        images,
        categoryId,
      },
    });

    // Generate and store embeddings for semantic search
    try {
      const embeddingText = `${name} ${description || ""}`;
      const embedding = await getEmbeddings(embeddingText);

      await prisma.$executeRaw`
        UPDATE "Product"
        SET embedding = ${embedding}::vector
        WHERE id = ${product.id}
      `;
    } catch (embeddingError) {
      console.error("Failed to generate embedding:", embeddingError);
      // We don't fail the whole request if embedding fails
    }

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
