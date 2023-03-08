import { Module } from '@nestjs/common';
import { ReportService } from './services/report/report.service';
import { ReportController } from './controllers/report/report.controller';

@Module({
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportsModule {}
