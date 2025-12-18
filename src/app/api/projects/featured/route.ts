import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const projects = await prisma.project.findMany({
      where: { isFeature: true },
      include: { images: true, services: true },
      take: pageSize,
      orderBy: { createdAt: "desc" } as const,
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Fetch featured projects error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
