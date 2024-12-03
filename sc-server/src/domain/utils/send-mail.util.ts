import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as ejs from 'ejs';

@Injectable()
export class SendMailService {
  private readonly logger = new Logger(SendMailService.name);
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendMailOTP(to: string, otpCode: string) {
    try {
      const html = await ejs.renderFile(
        path.join(process.cwd(), 'src/infrastructure/templates/otp.template.ejs'),
        { otpCode }
      );
      await this.transporter.sendMail({
        from: { name: this.configService.get('MAIL_DISPLAY_FROM') },
        to,
        subject: '[SOS Connect] – Email Verification',
        html,
      });
      this.logger.log('Email sent successfully');
    } catch (error) {
      this.logger.error('Error sending email:', error);
    }
  }
}
