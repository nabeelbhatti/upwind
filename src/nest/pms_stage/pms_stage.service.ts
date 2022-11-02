import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Stage } from 'src/entities/pms_stage.entity';
import { ObjectId } from 'mongodb';

Injectable;
export class StageService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: MongoRepository<Stage>,
  ) {}

  async findAll(): Promise<Stage[]> {
    return this.stageRepository.find();
  }

  async create(input: Stage): Promise<Stage> {
    const stage = new Stage();
    // (status.completed = input.completed),
    //   (status.inProgress = input.inProgress),
    //   (status.pending = input.pending);
    stage.name = input.name
    return this.stageRepository.save(stage);
  }

  async deleteById(id): Promise<Stage> {
    const data = await this.stageRepository.findOneBy({ _id: new ObjectId(id) });
    return this.stageRepository.remove(data);
  }

  async getById(id): Promise<Stage> {
    return await this.stageRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async updateById(id, input): Promise<Stage> {
    const data = await this.stageRepository.findOneBy({ _id: new ObjectId(id) });
    data.name = input.name
        return await this.stageRepository.save(data);

      
  }
}
