import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { ReportRequestDto } from './dtos/report-request.dto';
import { SendReportRequestDto } from './dtos/send-report-request.dto';
import { MailingService } from './mailing.service';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint, ComplaintDocument } from './models/complaint.model';
import { Model } from 'mongoose';
import { ReportTemplate } from './assets/report.template';
import { MockService } from './mock.service';
import { Report, ReportDocument } from './models/report.model';
import * as EmailValidator from 'email-validator';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { createReadStream } from 'fs';

@Injectable()
export class AuditService {
  constructor(
    private mailerService: MailingService,
    @InjectModel(Complaint.name)
    private complaintRepository: Model<ComplaintDocument>,
    @InjectModel(Report.name)
    private reportRepository: Model<ReportDocument>,
    private mockService: MockService,
  ) {}

  private validateRequest(dto: ReportRequestDto) {
    if (!dto || !dto.dateStart || !dto.dateEnd) {
      if (!(dto.dateStart instanceof Date)) {
        throw new HttpException(
          `Invalid 'dateStart' field format`,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!(dto.dateEnd instanceof Date)) {
        throw new HttpException(
          `Invalid 'dateEnd' field format`,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException('Empty request body', HttpStatus.BAD_REQUEST);
    }
  }

  async createUserReport(dto: ReportRequestDto, id: string): Promise<Report> {
    // this.validateRequest(dto);
    const report = this.mockService.getMock(Math.floor(Math.random() * 360));
    report.userId = id;
    return await this.reportRepository.create(report);
  }

  async createInstitutionReport(dto: ReportRequestDto, id: number) {
    // this.validateRequest(dto);
    const report = this.mockService.getMock(Math.floor(Math.random() * 360));
    report.institutionId = id;
    return await this.reportRepository.create(report);
  }

  async createReport(dto: ReportRequestDto) {
    // this.validateRequest(dto);
    const report = this.mockService.getMock(Math.floor(Math.random() * 360));
    return await this.reportRepository.create(report);
  }

  // async createUserReportPDF(
  //   dto: SendReportRequestDto,
  //   id: string,
  // ): Promise<StreamableFile> {
  //   this.validateRequest(dto);
  //   const report = this.mockService.getMock(Math.floor(Math.random() * 360));
  //
  //   pdf.create(ReportTemplate(report), {}).toFile('result.pdf', (error) => {
  //     console.log(error);
  //   });
  //
  //   if (dto.email) {
  //     if (EmailValidator.validate(dto.email)) {
  //       this.mailerService.sendReportPDF(pdf, dto.email);
  //     } else {
  //       throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
  //     }
  //   }
  //
  //   report.userId = id;
  //
  //   const report_ = await this.reportRepository.create(report);
  //   const filePath = uuidv4();
  //
  //   pdf.create(ReportTemplate(report_), {}).toFile(filePath, (error) => {
  //     console.log(error);
  //   });
  //
  //   const file = createReadStream(join(process.cwd(), filePath));
  //
  //   return new StreamableFile(file);
  // }
  //
  // async createInstitutionReportPDF(
  //   dto: SendReportRequestDto,
  //   id: number,
  // ): Promise<StreamableFile> {
  //   this.validateRequest(dto);
  //   const report = this.mockService.getMock(Math.floor(Math.random() * 360));
  //
  //   pdf.create(ReportTemplate(report), {}).toFile('result.pdf', (error) => {
  //     console.log(error);
  //   });
  //
  //   if (dto.email) {
  //     if (EmailValidator.validate(dto.email)) {
  //       this.mailerService.sendReportPDF(pdf, dto.email);
  //     } else {
  //       throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
  //     }
  //   }
  //
  //   report.institutionId = id;
  //
  //   const report_ = await this.reportRepository.create(report);
  //   const filePath = uuidv4();
  //
  //   pdf.create(ReportTemplate(report_), {}).toFile(filePath, (error) => {
  //     console.log(error);
  //   });
  //
  //   const file = createReadStream(join(process.cwd(), filePath));
  //
  //   return new StreamableFile(file);
  // }
  //
  // async createReportPDF(dto: SendReportRequestDto): Promise<StreamableFile> {
  //   this.validateRequest(dto);
  //   const report = this.mockService.getMock(Math.floor(Math.random() * 360));
  //
  //   pdf.create(ReportTemplate(report), {}).toFile('result.pdf', (error) => {
  //     console.log(error);
  //   });
  //
  //   if (dto.email) {
  //     if (EmailValidator.validate(dto.email)) {
  //       this.mailerService.sendReportPDF(pdf, dto.email);
  //     } else {
  //       throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
  //     }
  //   }
  //
  //   const report_ = await this.reportRepository.create(report);
  //   const filePath = uuidv4();
  //
  //   pdf.create(ReportTemplate(report_), {}).toFile(filePath, (error) => {
  //     console.log(error);
  //   });
  //
  //   const file = createReadStream(join(process.cwd(), filePath));
  //
  //   return new StreamableFile(file);
  // }
}
