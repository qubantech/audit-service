import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComplaintDocument = Complaint & Document;

@Schema()
export class Complaint {
  @Prop()
  id: string;

  @Prop()
  status: string;

  @Prop()
  dateSent: number;

  @Prop()
  dateResponded: number;

  @Prop()
  userId: string;

  @Prop()
  theme: string;

  @Prop()
  text: string;

  @Prop()
  tags: string[];

  @Prop()
  keywords: string[];

  @Prop()
  institutionId: number;

  @Prop()
  response: string;

  @Prop()
  score: number;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
