import { AnalystController } from './pms_analyst.controller';
import { Analyst } from 'src/entities/pms_analyst.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalystService } from './pms_analyst.service';

@Module({
  imports: [TypeOrmModule.forFeature([Analyst])],
  controllers: [AnalystController],
  providers: [AnalystService],
})
export class AnalystModule {}
