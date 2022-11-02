import { PmsProjectServices } from './pms_project.service';
import { PmsProjectController } from './pms_project.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PmsProject } from 'src/entities/pms_project.entity';
import { LibClient } from '../../entities/clients.entity';
import { ClientController } from '../clients/clients.controller';
import { ClientServices } from '../clients/clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([PmsProject, LibClient])],
  controllers: [PmsProjectController, ClientController],
  providers: [PmsProjectServices, ClientServices],
})
export class VesselsModule {}
