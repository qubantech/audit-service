import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  @ApiProperty({ example: '05-Aug-2010', description: 'Creation date' })
  readonly createdAt: Date;

  @ApiProperty({
    example: '12',
    description: 'Complaints total amount',
  })
  readonly complaintsAmount: number;

  @ApiProperty({
    example: '7',
    description: 'Total complaints processed',
  })
  readonly complaintsProcessed: number;

  @ApiProperty({
    example: '3',
    description: 'Total complaints pending',
  })
  readonly complaintsPending: number;

  @ApiProperty({
    example: '1',
    description: 'Total complaints rejected',
  })
  readonly complaintsRejected: number;

  @ApiProperty({
    example: `['плохой', 'грязь', 'поликлиника']`,
    description: 'Most popular keywords',
  })
  readonly mostPopularKeywords: string[];

  @ApiProperty({
    example: `['обслуживание', 'персонал']`,
    description: 'Most popular topics',
  })
  readonly mostPopularTopics: string[];

  @ApiProperty({
    example: `['пункт забора', 'медицинская сестра']`,
    description: 'Most popular scripts',
  })
  readonly mostPopularScripts: string[];

  @ApiProperty({
    example: `0.63248211`,
    description: 'Complaints meaningfulness mean score',
  })
  readonly complaintsMeaningfulnessMeanScore: number;

  @ApiProperty({
    example: `23`,
    description: 'Peak complaints amount number',
  })
  readonly peakComplaintsAmountNumber: number;

  @ApiProperty({
    example: `05-Aug-2017`,
    description: 'Peak complaints amount date',
  })
  readonly peakComplaintsAmountDate: Date;

  @ApiProperty({
    example: `12.46`,
    description: 'Mean complaint processing time in days',
  })
  readonly meanComplaintProcessingTime: number;

  @ApiProperty({
    example: `87.46`,
    description: 'Max complaint processing time in days',
  })
  readonly maxComplaintProcessingTime: number;

  @ApiProperty({
    example: `[1, 2, 0, 0, 3, 8, 0]`,
    description: 'Complaints amount per day hist',
  })
  readonly complaintsAmountPerDayHist: number[];
}
