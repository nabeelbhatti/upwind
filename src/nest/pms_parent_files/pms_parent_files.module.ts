import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { PmsParentFiles } from 'src/entities/pms_parent_files.entity';
import { PmsParentFilesController } from './pms_parent_files.controller';
import { PmsParentFilesService } from './pms_parent_files.service';

@Module({
  imports: [TypeOrmModule.forFeature([PmsParentFiles, Category])],
  controllers: [PmsParentFilesController],
  providers: [PmsParentFilesService]
})
export class PmsParentFilesModule {}
