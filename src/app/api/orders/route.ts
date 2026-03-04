import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = (session.user as any).id;
    const isAdmin = (session.user as any).role === "ADMIN";

    const orders = await prisma.order.findMany({
      where: isAdmin ? {} : { userId },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { items, totalAmount, address } = body;

    if (!items || items.length === 0) {
      return new NextResponse("Empty cart", { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        userId: (session.user as any).id,
        totalAmount,
        address,
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
