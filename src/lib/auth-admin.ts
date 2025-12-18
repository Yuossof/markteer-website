import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface DecodedToken {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean
}

export async function verifyAdminToken(token: string | undefined): Promise<DecodedToken | null> {
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const payload = await jwtVerify(token, secret);
        const decoded = payload.payload as unknown as DecodedToken;

        // Verify user is admin
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!user) {
            return null;
        }

        return decoded;
    } catch (error) {
        console.error("Token verification error:", error);
        return null;
    }
}
