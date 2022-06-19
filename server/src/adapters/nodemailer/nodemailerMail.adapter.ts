import { MailAdapter, SendMailData } from "../mail.adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d161d42a02fede",
    pass: "c260798bae9b77",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Just2 <noreply@fjustit2.com>",
      to: "Alex Silva <batata.teste@sesad.com",
      subject,
      html: body,
    });
  }
}
