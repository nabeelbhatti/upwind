import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';
import { Category } from 'src/entities/categories.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
