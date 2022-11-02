import { Injectable } from '@nestjs/common';
import { PmsAutomationSpare } from 'src/entities/pms_automation_spare.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

Injectable;
export class PmsSpareService {
  constructor(
    @InjectRepository(PmsAutomationSpare)
    private readonly spearsRepository: MongoRepository<PmsAutomationSpare>,
  ) {}

  async findAll(id): Promise<PmsAutomationSpare[]> {
    return this.spearsRepository.find({
      where: {
        vessel_id: id,
      },
    });
  }
}
