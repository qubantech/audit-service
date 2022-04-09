import { Injectable } from '@nestjs/common';
import { Report } from './models/report.model';

@Injectable()
export class MockService {
  getMock(periodDaysAmount: number): Report {
    const keywords = [
      'масок',
      'ждать',
      'грязно',
      'информировать',
      'получить',
      'поликлиника',
      'сдача',
      'нарушением',
      'документов',
      'больнице',
      'отношение',
      'персонал',
      'биоматериала',
      'сумму',
      'очереди',
      'защиты',
      'средства',
      'анализ',
      'ожидал',
      'ПЦР',
      'записан',
      'чек',
      'выдан',
      'отказалась',
      'разобраться',
      'звонок',
      'срочном',
      'антителам',
      'пояснений',
    ];
    const topics = [
      'анализы',
      'персонал',
      'средства индивидуальной защиты',
      'очереди',
      'документы',
    ];
    const scripts = [
      'Пункт забора',
      'Медицинская сестра',
      'Горячая линия',
      'Режим ускоренного выполнения анализа',
    ];

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    function randomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
      );
    }

    const complaintsAmount = getRandomInt(Math.sqrt(periodDaysAmount));
    const complaintsPending = Math.floor(
      (Math.random() / 4 + 0.33) * complaintsAmount,
    );
    const complaintRejected = Math.floor(
      (Math.random() / 3) * complaintsAmount,
    );
    const complaintsProcessed =
      complaintsAmount - (complaintsPending + complaintRejected);

    return {
      complaintsAmount: complaintsAmount,
      userId: null,
      institutionId: null,
      complaintsAmountPerDayHist: [
        0.05 * complaintsAmount,
        0.2 * complaintsAmount,
        0.15 * complaintsAmount,
        0.3 * complaintsAmount,
        0.1 * complaintsAmount,
        0.15 * complaintsAmount,
        0.05 * complaintsAmount,
      ],
      complaintsMeaningfulnessMeanScore: Math.random() / 4 + 0.37,
      complaintsPending: complaintsPending,
      complaintsProcessed: complaintsProcessed,
      complaintsRejected: complaintRejected,
      createdAt: randomDate(new Date(2022, 3, 1), new Date()),
      maxComplaintProcessingTime:
        Math.sqrt(
          periodDaysAmount + getRandomInt(Math.sqrt(periodDaysAmount)),
        ) * getRandomInt(Math.sqrt(periodDaysAmount)),
      meanComplaintProcessingTime:
        Math.sqrt(
          periodDaysAmount + getRandomInt(Math.sqrt(periodDaysAmount)),
        ) *
        getRandomInt(Math.sqrt(periodDaysAmount)) *
        (Math.random() / 3 + 0.33),
      mostPopularKeywords: keywords.filter((value) => Math.random() > 0.66),
      mostPopularScripts: scripts.filter((value) => Math.random() > 0.5),
      mostPopularTopics: topics.filter((value) => Math.random() > 0.67),
      peakComplaintsAmountDate: randomDate(
        new Date(2022, 1, 1),
        new Date(2022, 3, 1),
      ),
      peakComplaintsAmountNumber: getRandomInt(periodDaysAmount * 0.2),
    };
  }
}
