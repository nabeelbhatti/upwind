import { PmsSpareService } from './pms_automation_spare.service';
import { PmsSpareController } from './pms_automation_spare.controller';
import { PmsAutomationSpare } from 'src/entities/pms_automation_spare.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PmsAutomationSpare])],
  controllers: [PmsSpareController],
  providers: [PmsSpareService],
})
export class PmsSpareModule {}
