import { Resend } from 'resend';

const resend = new Resend('re_G8aHn67K_GHLm58rBQGE6bGfxhMGpLX9T');

export const sendEmail = async (subject: string, to: string[], html?: string,) => {
    return resend.emails.send({
        from: 'onboarding@resend.dev',
        to: to,
        subject: subject || "Subject not found",
        html: html || ""
    });
}
