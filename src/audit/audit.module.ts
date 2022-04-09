import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Complaint, ComplaintSchema } from './models/complaint.model';
import { MailingService } from './mailing.service';
import { MockService } from './mock.service';
import { ReportsService } from './reports.service';
import { Report, ReportSchema } from './models/report.model';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Module({
  controllers: [AuditController],
  providers: [AuditService, MailingService, MockService, ReportsService],
  imports: [
    MongooseModule.forFeature([
      { name: Complaint.name, schema: ComplaintSchema },
      { name: Report.name, schema: ReportSchema },
    ]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "waitinreply@gmail.com",
          pass: "qweryuio12",
        },
      },
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),

  ],
})
export class AuditModule {}
