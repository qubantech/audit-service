import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from './models/report.model';
import { Injectable, StreamableFile } from '@nestjs/common';
import { ReportTemplate } from './assets/report.template';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { createReadStream } from 'fs';
import * as fs from 'fs';
import * as PdfPrinter from 'pdfmake';
import pdfMakeUnicode from 'pdfmake-unicode';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { MailingService } from "./mailing.service";

//دع هذا الرمز يعمل بدون أخطاء ، فالخادم لا يتعطل
// ، دع الأرنب يبدأ ولا يسقط ويمكننا الاتصال به ، دع هذا الرمز يكتسب حماية فارغة بفضل هذه الصلاة
// ، التي تمنحه قوة إلهية ، دع الحزم لا تفعل الصراع والبناء يزن الحد الأدنى

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name)
    private reportRepository: Model<ReportDocument>,
    private mailingService: MailingService,
  ) {}

  async getReportsByUserId(id: string) {
    return this.reportRepository.findOne({ userId: id });
  }

  async getReportsByInstitutionId(id: string) {
    return this.reportRepository.findOne({ institutionId: id });
  }

  async getAllReports() {
    return this.reportRepository.find();
  }

  async getPDFByReportId(id: string, email: string) {

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('/');
    }

    const report = await this.reportRepository.findById(id);

    const fonts = {
      Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic'
      },
    };

    const printer = new PdfPrinter(fonts);

    function t( str ) {

      let ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
      }, n_str = [];

      str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

      for ( let i = 0; i < str.length; ++i ) {
        n_str.push(
            ru[ str[i] ]
            || ru[ str[i].toLowerCase() ] == undefined && str[i]
            || ru[ str[i].toLowerCase() ].toUpperCase()
        );
      }

      return n_str.join('');
    }

    const docDefinition = {
      content: [
        { text: "Lihogub Oleg, document created at: " + formatDate(report.createdAt) , fontSize: 16},
        '\nComplaints',
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
            body: [
              [ 'Complaints total ', 'Processed', 'Pending', 'Rejected' ],
              [
                  report.complaintsAmount,
                  report.complaintsProcessed,
                  report.complaintsPending,
                  report.complaintsRejected
              ],
            ],
          },
        },
        '\nMetrics',
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            body: [
              [ 'Metric', 'Score' ],
              [ 'Mean meaningfulness score', report.complaintsMeaningfulnessMeanScore ],
              [ 'Peak complaints amount number', report.peakComplaintsAmountNumber ],
              [ 'Peak complaints number day', report.peakComplaintsAmountDate ],
              [ 'Mean complaint processing time', report.meanComplaintProcessingTime ],
              [ 'Max processing time', report.maxComplaintProcessingTime ],
            ],
          },
        },
        '\n',
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            body: [
              [ 'Most popular keywords' ],
                ...(report.mostPopularKeywords.map(word => [ t(word) ])),
            ],
          },
        },
        '\n',
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            body: [
              [ 'Most popular complaint topics' ],
                ...(report.mostPopularTopics.map(word => [ t(word) ])),
            ],
          },
        },
        '\n',
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            body: [
              [ 'Most popular complaint scripts' ],
                ...(report.mostPopularScripts.map(word => [ t(word) ])),
            ],
          },
        },
        '\nComplaints week distribution',
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            body: [
              [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
              report.complaintsAmountPerDayHist,
            ],
          },
        },
      ],
      defaultStyle: {
        font: 'Times'
      }
    };

    let file_name = 'PDF' + uuidv4() + '.pdf';

    const pdfDoc = printer.createPdfKitDocument(docDefinition, { });

    pdfDoc.pipe(fs.createWriteStream(file_name));
    pdfDoc.end();

    const file = createReadStream(join(process.cwd(), file_name));

    try {
      this.mailingService.sendReportPDF(file, email);
    }
    catch (error){
      console.error(error)
    }

    return new StreamableFile(file);
  }
}
