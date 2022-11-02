import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientDocType } from 'src/entities/client_doc_type.entity';
import { ClientDocTypeController } from './client_doc_type.controller';
import { ClientDocTypeService } from './client_doc_type.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientDocType])],
  controllers: [ClientDocTypeController],
  providers: [ClientDocTypeService],
})
export class ClientDocTypeModule {}