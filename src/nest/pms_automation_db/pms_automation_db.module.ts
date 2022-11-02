import { PmsDbService } from './pms_automation_db.service';
import { PmsDbController } from './pms_automation_db.controller';
import { PmsAutomationDb } from 'src/entities/pms_automation_db.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PmsAutomationDb])],
  controllers: [PmsDbController],
  providers: [PmsDbService],
})
export class PmsDbModule {}
