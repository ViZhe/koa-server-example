
import nodemailer, { SendMailOptions } from 'nodemailer';

import { SMTP } from '../../config';


const transporter = nodemailer.createTransport({
  auth: {
    pass: SMTP.PASSWORD,
    user: SMTP.USER,
  },
  host: SMTP.HOST,
  port: Number.parseInt(SMTP.PORT, 10),
  secure: Number.parseInt(SMTP.PORT, 10) === 465,
});

const sendMail = async ({ to, from, subject, html }: SendMailOptions) => {
  try {
    await transporter.sendMail({ to, from, subject, html });
  } catch (error) {
    return {
      message: error,
      status: 500,
      success: false,
    };
  }

  return {
    message: 'The letter was sent',
    status: 200,
    success: true,
  };
};


export default sendMail;
