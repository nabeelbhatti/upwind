import { Injectable } from '@nestjs/common';
import { PmsAutomationDb } from 'src/entities/pms_automation_db.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

Injectable;
export class PmsDbService {
  constructor(
    @InjectRepository(PmsAutomationDb)
    private readonly pmsAutomationRepository: MongoRepository<PmsAutomationDb>,
  ) {}

  async findAll(): Promise<PmsAutomationDb[]> {
    return this.pmsAutomationRepository.find();
  }
}
