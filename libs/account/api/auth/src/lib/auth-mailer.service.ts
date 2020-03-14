import { BadGatewayException, Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

const mailOptions = (to: string | string[]) => {
  return {
    from: 'no-reply-seek.workspace@gmail.com',
    to: `${Array.isArray(to) ? to.join(',') : to}`
  };
};

@Injectable()
export class AuthMailerService {
  transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  }
  async forgotPassword(token: string, email: string) {
    const options = Object.assign(mailOptions(email), {
      subject: 'Recuperação da conta',
      html: `
        <div style="text-align: center">
          <h2>Código</h2>
          <h1>${token}</h1>
          <p>Copie e cole este token para alterar sua senha.</p>
          <p>Código válido por <em>24 horas</em>.</p>
        </div>`
    });
    try {
      const send = await this.transporter.sendMail(options);
      if (send) {
        return send;
      }
    } catch (err) {
      console.log(err);
      throw new BadGatewayException(err.message);
    }
  }
}
