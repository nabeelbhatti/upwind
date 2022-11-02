import { TypesService } from './types.service';
import { TypeController } from './types.controller';
import { Types } from 'src/entities/types.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Types])],
  controllers: [TypeController],
  providers: [TypesService],
})
export class TypesModule {}
