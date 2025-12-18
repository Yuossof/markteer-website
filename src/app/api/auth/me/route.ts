import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("authToken")?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 200 });

    const secret = new TextEncoder().encode(JWT_SECRET);
    const payload = await jwtVerify(token, secret);
    const decoded = payload.payload as { id: string };
    if (!decoded?.id) return NextResponse.json({ user: null }, { status: 200 });

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, isAdmin: true },
    });

    if (!user) return NextResponse.json({ user: null }, { status: 200 });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("/api/auth/me error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
