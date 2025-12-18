import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yuossofahmed@gmail.com",      
    pass: "tllx cjpy xman rckb",        
  },
});

export const sendEmail = async (to: string[], subject: string, html: string) => {
  const info = await transporter.sendMail({
    from: '"Contact Form" <your-email@gmail.com>',
    to: to.join(","),
    subject,
    html,
  });

  console.log("Message sent: %s", info.messageId);
};
