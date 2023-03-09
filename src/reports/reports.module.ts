import { Module } from '@nestjs/common';
import { ReportService } from './services/report/report.service';
import { ReportController } from './controllers/report/report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './report.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ReportEntity])],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportsModule {}
