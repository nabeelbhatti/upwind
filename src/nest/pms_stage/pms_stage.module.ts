import { StageService } from "./pms_stage.service";
import { StageController } from "./pms_stage.controller";
import { Stage } from "src/entities/pms_stage.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Stage])],
    controllers: [StageController],
    providers: [StageService]
})

export class StageModule { }