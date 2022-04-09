import { Injectable, StreamableFile } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";
import fs, { createReadStream } from "fs";
import { join } from "path";

@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}
  sendReportPDF(pdf: any, email: string) {
    this
        .mailerService
        .sendMail({
          to: email,
          from: 'waitinreply@gmail.com',
          subject: 'Your report',
          text: 'Your report',
          html: '<b>Your report</b>',
          attachments: [pdf]
        })
        .then((success) => {
          console.log(success)
        })
        .catch((err) => {
          console.log(err)
        });
  }
}
