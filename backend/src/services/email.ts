import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (name: string, email: string, confirmation_token: string) => {
    await transport.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
             <h2>Hello ${name}</h2>
             <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
             <a href=http://localhost:3333/api/v1/confirm/${confirmation_token}> Click here</a>
             </div>`,
    });
};
  
export {
    sendEmail,
};