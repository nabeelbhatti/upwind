import { ManagerService } from './pms_manager.service';
import { ManagerController } from './pms_manager.controller';
import { Manager } from 'src/entities/pms_manager.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
