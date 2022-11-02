import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ScreeningReport } from 'src/entities/screening_report.entity';
import { ObjectId } from 'mongodb';
import { Category } from 'src/entities/categories.entity';

Injectable;
export class ScreeningReportService {
  constructor(
    @InjectRepository(ScreeningReport)
    private readonly stageRepository: MongoRepository<ScreeningReport>,
    @InjectRepository(Category)
    private readonly CategoryRepository: MongoRepository<Category>,
  ) {}

  async create(input: ScreeningReport, id: any): Promise<ScreeningReport> {
    const getCategoryData = await this.getCategory('Open');
    const screening = new ScreeningReport();
    screening.report_Date = input.report_Date
    screening.last_date = input.last_date;
    screening.batch_number = input.batch_number;
    screening.project_id = new ObjectId(id);
    screening.status = getCategoryData;
    return this.stageRepository.save(screening);
  }

  async getCategory(status): Promise<Category> {
    try {
      const categoryData = await this.CategoryRepository.findOneBy({
        where: {
          name: status,
          categoryType: 'Status',
        },
      });
      return categoryData;
    } catch (error) {
      return error.message;
    }
  }

  async getById(id): Promise<ScreeningReport> {
    return await this.stageRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async getByProjectId(id): Promise<any> {
    return this.stageRepository.find({
      where: {
        project_id: new ObjectId(id),
      },
    });
  }
}
