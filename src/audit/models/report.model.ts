import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema()
export class Report {
  @Prop()
  @ApiProperty({ example: '05-Aug-2010', description: 'Creation date' })
  createdAt: Date;

  @Prop()
  @ApiProperty({ example: 'as4dm3aDSd4dw9F2', description: 'User id' })
  userId: string | null;

  @Prop()
  @ApiProperty({ example: '123', description: 'Institution id' })
  institutionId: number;

  @Prop()
  @ApiProperty({
    example: '12',
    description: 'Complaints total amount',
  })
  complaintsAmount: number;

  @Prop()
  @ApiProperty({
    example: '7',
    description: 'Total complaints processed',
  })
  complaintsProcessed: number;

  @Prop()
  @ApiProperty({
    example: '3',
    description: 'Total complaints pending',
  })
  complaintsPending: number;

  @Prop()
  @ApiProperty({
    example: '1',
    description: 'Total complaints rejected',
  })
  complaintsRejected: number;

  @Prop()
  @ApiProperty({
    example: `['плохой', 'грязь', 'поликлиника']`,
    description: 'Most popular keywords',
  })
  mostPopularKeywords: string[];

  @Prop()
  @ApiProperty({
    example: `['обслуживание', 'персонал']`,
    description: 'Most popular topics',
  })
  mostPopularTopics: string[];

  @Prop()
  @ApiProperty({
    example: `['пункт забора', 'медицинская сестра']`,
    description: 'Most popular scripts',
  })
  mostPopularScripts: string[];

  @Prop()
  @ApiProperty({
    example: `0.63248211`,
    description: 'Complaints meaningfulness mean score',
  })
  complaintsMeaningfulnessMeanScore: number;

  @Prop()
  @ApiProperty({
    example: `23`,
    description: 'Peak complaints amount number',
  })
  peakComplaintsAmountNumber: number;

  @Prop()
  @ApiProperty({
    example: `05-Aug-2017`,
    description: 'Peak complaints amount date',
  })
  peakComplaintsAmountDate: Date;

  @Prop()
  @ApiProperty({
    example: `12.46`,
    description: 'Mean complaint processing time in days',
  })
  meanComplaintProcessingTime: number;

  @Prop()
  @ApiProperty({
    example: `87.46`,
    description: 'Max complaint processing time in days',
  })
  maxComplaintProcessingTime: number;

  @Prop()
  @ApiProperty({
    example: `[1, 2, 0, 0, 3, 8, 0]`,
    description: 'Complaints amount per day hist',
  })
  complaintsAmountPerDayHist: number[];
}

export const ReportSchema = SchemaFactory.createForClass(Report);
