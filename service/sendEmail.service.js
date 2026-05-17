
import nodemailer from "nodemailer";

export const sendEmail = async (to,subject,htmlData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"HostMost Team" ${process.env.FROM_EMAIL}`,
    to,
    subject,
    html: htmlData ,
  });
};