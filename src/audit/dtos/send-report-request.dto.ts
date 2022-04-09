import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendReportRequestDto {
  @ApiProperty({ example: '05-Aug-2010', description: 'Start date' })
  readonly dateStart: Date;
  @ApiProperty({ example: '05-Dec-2017', description: 'End date' })
  readonly dateEnd: Date;
  @ApiProperty({ example: 'mail@mail.ru', description: 'Email to send report' })
  @IsEmail({}, { message: 'Must be email' })
  readonly email: string;
}
