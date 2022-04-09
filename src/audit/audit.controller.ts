import { Body, Controller, Get, Param, Response } from '@nestjs/common';
import { AuditService } from './audit.service';
import { ReportRequestDto } from './dtos/report-request.dto';
import { SendReportRequestDto } from './dtos/send-report-request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Report } from './models/report.model';
import { ReportsService } from './reports.service';

@Controller('report')
export class AuditController {
  constructor(
    private auditService: AuditService,
    private reportsService: ReportsService,
  ) {}

  @ApiOperation({ summary: 'Get user report on time period' })
  @ApiResponse({ status: 200, type: Report })
  @Get('create/user/:id')
  getUserReport(@Body() dto: ReportRequestDto, @Param('id') id: string) {
    return this.auditService.createUserReport(dto, id);
  }

  @ApiOperation({ summary: 'Get institution report on time period' })
  @ApiResponse({ status: 200, type: Report })
  @Get('create/institution/:id')
  getInstitutionReport(@Body() dto: ReportRequestDto, @Param('id') id: number) {
    return this.auditService.createInstitutionReport(dto, id);
  }

  @ApiOperation({ summary: 'Get institution report on time period' })
  @ApiResponse({ status: 200, type: Report })
  @Get('/create/')
  getFullReport(@Body() dto: ReportRequestDto) {
    return this.auditService.createReport(dto);
  }

  // @ApiOperation({ summary: 'Get institution report on time period' })
  // @ApiResponse({ status: 200, type: Report })
  // @Get('create/user/pdf/:id')
  // getUserReportPDF(@Body() dto: SendReportRequestDto, @Param('id') id: string) {
  //   return this.auditService.createUserReportPDF(dto, id);
  // }
  //
  // @ApiOperation({ summary: 'Get institution report on time period' })
  // @ApiResponse({ status: 200, type: Report })
  // @Get('create/institution/pdf/:id')
  // getInstitutionReportPDF(
  //   @Body() dto: SendReportRequestDto,
  //   @Param('id') id: number,
  // ) {
  //   return this.auditService.createInstitutionReportPDF(dto, id);
  // }
  //
  // @ApiOperation({ summary: 'Get institution report on time period' })
  // @ApiResponse({ status: 200, type: Report })
  // @Get('create/pdf')
  // getFullReportPDF(@Body() dto: SendReportRequestDto) {
  //   return this.auditService.createReportPDF(dto);
  // }

  @ApiOperation({ summary: 'Get user reports' })
  @ApiResponse({ status: 200, type: [Report] })
  @Get('/user/:id')
  getReportsByUserId(@Param('id') id: string) {
    return this.reportsService.getReportsByUserId(id);
  }

  @ApiOperation({ summary: 'Get institution reports' })
  @ApiResponse({ status: 200, type: [Report] })
  @Get('/institution/:id')
  getReportsByInstitutionId(@Param('id') id: string) {
    return this.reportsService.getReportsByInstitutionId(id);
  }

  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({ status: 200, type: [Report] })
  @Get('/')
  getAllReports() {
    return this.reportsService.getAllReports();
  }

  @ApiOperation({ summary: 'Get report by id' })
  @ApiResponse({ status: 200, type: [Report] })
  @Get('/pdf/:id')
  getReportPDF(@Body() email: { email: string }, @Response({ passthrough: true }) res, @Param('id') id: string) {
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="report.pdf"',
    });
    return this.reportsService.getPDFByReportId(id, email.email);
  }
}
