import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/report')
export class AppController {
  constructor(private readonly appService: AppService) {}
}