import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Status } from 'src/entities/pms_status.entity';
import { ObjectId } from 'mongodb';

Injectable;
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: MongoRepository<Status>,
  ) {}

  async findAll(): Promise<Status[]> {
    return this.statusRepository.find();
  }

  async create(input: Status): Promise<Status> {
    const status = new Status();
    status.name = input.name
    return this.statusRepository.save(status);
  }

  async deleteById(id): Promise<Status> {
    const data = await this.statusRepository.findOneBy({ _id: new ObjectId(id) });
    return this.statusRepository.remove(data);
  }

  async getById(id): Promise<Status> {
    return await this.statusRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async updateById(id, input): Promise<Status> {
    const data = await this.statusRepository.findOneBy({ _id: new ObjectId(id) });
    data.name = input.name
    return await this.statusRepository.save(data);
  }
}
