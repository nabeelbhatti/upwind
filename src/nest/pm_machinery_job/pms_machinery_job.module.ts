import { JobService } from './pms_machinery_job.service';
import { JobController } from './pms_machinery_job.controller';
import { Job } from 'src/entities/master_jobs.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
