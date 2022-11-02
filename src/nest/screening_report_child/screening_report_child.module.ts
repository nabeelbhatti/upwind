import { ScreeningReportChildService } from "./screening_report_child.service";
import { ScreeningReportChildController } from "./screening_report_child.controller";
import { ScreeningReportChild } from "src/entities/screening_report_child.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from 'src/entities/categories.entity';


@Module({
    imports: [TypeOrmModule.forFeature([ScreeningReportChild, Category])],
    controllers: [ScreeningReportChildController],
    providers: [ScreeningReportChildService]
})

export class ScreeningReportChildModule { }