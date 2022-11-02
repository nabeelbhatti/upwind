import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ScreeningReportChild } from 'src/entities/screening_report_child.entity';
import { ObjectId } from 'mongodb';
import { Category } from 'src/entities/categories.entity';

Injectable;
export class ScreeningReportChildService {
  constructor(
    @InjectRepository(ScreeningReportChild)
    private readonly stageRepository: MongoRepository<ScreeningReportChild>,
    @InjectRepository(Category)
    private readonly CategoryRepository: MongoRepository<Category>,
  ) {}

  async create(input: ScreeningReportChild): Promise<ScreeningReportChild> {
    // const getCategoryData = await this.getCategory('Open');
    // console.log(getCategoryData);
    const screening = new ScreeningReportChild();
    screening.job_status = input.job_status;
    screening.main_machinery = input.main_machinery;
    screening.plant = input.plant;
    screening.screening_remarks = input.screening_remarks;
    screening.vessels_type = input.vessels_type;
    screening.spare_status = input.spare_status;
    screening.type_of_update = input.type_of_update;
    // screening.status = getCategoryData;
    // screening.last_date = input.last_date;
    // screening.batch_number = input.batch_number;
    // screening.project_id = new ObjectId(id);
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

  async deleteById(id): Promise<ScreeningReportChild> {
    const data = await this.stageRepository.findOneBy({
      _id: new ObjectId(id),
    });
    return this.stageRepository.remove(data);
  }

  async getById(id): Promise<ScreeningReportChild> {
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
