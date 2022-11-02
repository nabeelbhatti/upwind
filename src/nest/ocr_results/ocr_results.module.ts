import { OcrService } from './ocr_results.service';
import { OcrController } from './ocr_results.controller';
import { OcrResult } from 'src/entities/ocr_results.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/entities/master_jobs.entity';
import { JobController } from '../pm_machinery_job/pms_machinery_job.controller';
import { JobService } from '../pm_machinery_job/pms_machinery_job.service';
import { Spears } from 'src/entities/machinery_spares.entity';
import { SpearsController } from '../pms_machinery_spears/pms_machinery_spears.controller';
import { SpearsService } from '../pms_machinery_spears/pms_machinery_spears.service';

@Module({
  imports: [TypeOrmModule.forFeature([OcrResult, Job,Spears])],
  controllers: [OcrController, JobController,SpearsController],
  providers: [OcrService, JobService,SpearsService],
})
export class OcrModule {}
