import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.DB_USER||'root'}:${process.env.DB_PASSWORD||'123456'}@${process.env.DB_HOST||'mongodb'}:${process.env.DB_PORT||'27017'}/${process.env.DB_NAME||''}`),
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
