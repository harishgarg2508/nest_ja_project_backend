import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomInt } from 'crypto';
@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailerService,
  ) {}
  private generateOtp(): string {
    const otp = randomInt(100000, 999999).toString(); 
    return otp;
  }

  sendMail() {
    const otp = this.generateOtp();
    this.mailService.sendMail({
      to: 'harishgarg11111@gmail.com',
      subject: `Birthday Greetings`,
      from: process.env.MAIL_USER,
      // template: './birthday',
      // context: {
      // name,
      //     company
      //},
      html: `<h1>Your OTP is ${otp}</h1>`,
      text: 'Hi how are you',
    });
     return { message: 'OTP sent', otp };
  }
}
