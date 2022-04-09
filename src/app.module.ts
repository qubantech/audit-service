import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://root:123456@mongodb:27017/`),
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
