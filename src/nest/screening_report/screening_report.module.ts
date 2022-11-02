import { ScreeningReportService } from "./screening_report.service";
import { ScreeningReportController } from "./screening_report.controller";
import { ScreeningReport } from "src/entities/screening_report.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from 'src/entities/categories.entity';


@Module({
    imports: [TypeOrmModule.forFeature([ScreeningReport, Category])],
    controllers: [ScreeningReportController],
    providers: [ScreeningReportService]
})

export class ScreeningReportModule { }