import { ApiProperty } from '@nestjs/swagger';

export class ReportRequestDto {
  @ApiProperty({ example: '05-Aug-2010', description: 'Start date' })
  readonly dateStart: Date;
  @ApiProperty({ example: '05-Dec-2017', description: 'End date' })
  readonly dateEnd: Date;
}
