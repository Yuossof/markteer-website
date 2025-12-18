/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
        const skip = (page - 1) * pageSize;

        const [emails, total] = await Promise.all([
            prisma.email.findMany({
                skip,
                take: pageSize,
                orderBy: { id: "desc" },
            }),
            prisma.email.count(),
        ]);

        const totalPages = Math.ceil(total / pageSize);
        return NextResponse.json(
            { emails, pagination: { page, pageSize, total, totalPages } },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Fetch emails error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { email } = await req.json();
        console.log(email)

        if (!email || !email.trim()) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        const existing = await prisma.email.findUnique({ where: { email: email } });
        if (existing) {
            return NextResponse.json({ error: "Email already exists" }, { status: 409 });
        }

        const created = await prisma.email.create({
            data: { email: email.toLowerCase().trim() },
        });

        return NextResponse.json({ message: "Email added", email: created }, { status: 201 });
    } catch (error: any) {
        console.error("Create email error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ error: "Failed to add email" }, { status: 500 });
    }
}
