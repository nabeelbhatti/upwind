import { StatusService } from './pms_status.service';
import { StatusController } from './pms_statuss.controller';
import { Status } from 'src/entities/pms_status.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
