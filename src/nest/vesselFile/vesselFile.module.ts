import { VesselFileService } from "./vesselFile.service";
import { VesselFileController } from "./vesselFile.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VesselFile } from "src/entities/vesselFile.entity";


@Module({
    imports: [TypeOrmModule.forFeature([VesselFile])],
    controllers: [VesselFileController],
    providers: [VesselFileService]
})

export class VesselFileModule { }