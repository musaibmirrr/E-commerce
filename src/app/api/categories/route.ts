import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
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
    const { name, description } = body;

    const category = await prisma.category.create({
      data: { name, description },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
