import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { contactSchema } from "@/lib/validators";
import { sendEmail } from "@/lib/email";
import {htmlForContactEmail} from "../../../lib/htmlForEmail"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parse = contactSchema.safeParse(body);
        if (!parse.success) {
            return NextResponse.json(
                { error: parse.error.flatten() },
                { status: 400 }
            );
        }

        const {
            title,
            subject,
            firstName,
            lastName,
            email,
            company,
            phoneNumber,
            message,
            market
        } = parse.data;

        // Create service with modules
        const service = await prisma.message.create({
            data: {
                title: title.trim(),
                subject: subject.trim(),
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                company: company.trim(),
                phoneNumber: phoneNumber.trim(),
                message: message.trim(),
                market: market.trim()
            }
        });

        const emails = await prisma.email.findMany()
        const emailsArr = emails.map((email)=> email.email)
        const result = await sendEmail(emailsArr, "You have a new message!" , htmlForContactEmail(firstName, lastName, email, message))
        console.log(result, "email res")
        return NextResponse.json(
            {
                message: "Service created successfully",
                service
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating contact:", error);

        const message =
            error instanceof Error
                ? error.message
                : typeof error === "string"
                    ? error
                    : "Internal Server Error";

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}