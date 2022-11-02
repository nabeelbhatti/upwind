import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { PmsChildFiles } from 'src/entities/pms_child_files.entity';
import { PmsParentFiles } from 'src/entities/pms_parent_files.entity';
import { PmsParentFilesService } from '../pms_parent_files/pms_parent_files.service';
import { PmsChildFilesController } from './pms_child_files.controller';
import { PmsChildFilesService } from './pms_child_files.service';

@Module({
  imports: [TypeOrmModule.forFeature([PmsChildFiles, Category, PmsParentFiles])],
  controllers: [PmsChildFilesController],
  providers: [PmsChildFilesService, PmsParentFilesService],
})
export class PmsChildFilesModule {}
