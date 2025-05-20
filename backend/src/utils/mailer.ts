import nodemailer from "nodemailer";

// Create a transporter using Postmark SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.postmarkapp.com",
  port: 587,
  secure: false,
  auth: {
    user: "bbcdbc5c-23be-4f43-b243-5aedc1ae4e42",
    pass: "bbcdbc5c-23be-4f43-b243-5aedc1ae4e42",
  },
});

export const sendRegistrationEmail = async (
  to: string,
  firstName: string,
  email: string
) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your App Name" ${email}`,
      to,
      subject: "Welcome to Our Platform!",
      text: `Hi ${firstName},\n\nThanks for registering with us.\n\n— The Team`,
      html: `<p>Hi <strong>${firstName}</strong>,</p><p>Thanks for registering with us.</p><p>— The Team</p>`,
      headers: {
        "X-PM-Message-Stream": "notification",
      },
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
