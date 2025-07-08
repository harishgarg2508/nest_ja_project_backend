import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { MailRepository } from 'src/repository/mail.repository';
@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly mailRepository: MailRepository, 
  ) {}

  private generateOtp(): string {
    const otp = randomInt(100000, 999999).toString(); 
    this.mailRepository.saveOtp({ otp: parseInt(otp) }); 
    return otp;

  }

  sendMail() {
    const otp = this.generateOtp();
    this.mailService.sendMail({
      to: 'harishgarg11111@gmail.com',
      subject:`Your OTP Code`,
      from: process.env.MAIL_USER,
      html: `<h1>Your OTP is ${otp}</h1>`,
      text: 'OTP verification',
    });

     return { message: 'OTP sent', otp };
  }
}
