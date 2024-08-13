import { Body, Controller, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  createReports(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}
