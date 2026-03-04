import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getEmbeddings } from "@/lib/openai";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: { name: true, image: true }
            }
          }
        }
      },
    });

    if (!product) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const product = await prisma.product.update({
      where: { id },
      data: body,
    });

    // If name or description updated, regenerate embedding
    if (body.name || body.description) {
      try {
        const embeddingText = `${product.name} ${product.description || ""}`;
        const embedding = await getEmbeddings(embeddingText);

        await prisma.$executeRaw`
          UPDATE "Product"
          SET embedding = ${embedding}::vector
          WHERE id = ${product.id}
        `;
      } catch (embeddingError) {
        console.error("Failed to update embedding:", embeddingError);
      }
    }

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
