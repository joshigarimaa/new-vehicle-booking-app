import nodemailer from "nodemailer";

export const sendMail = async (to: string, subject: string, text: string) => {
  console.log("EMAIL USER:", process.env.SMTP_USER);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"RYDEX" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent");
  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};