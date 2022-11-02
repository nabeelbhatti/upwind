import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Analyst } from 'src/entities/pms_analyst.entity';
import { ObjectId } from 'mongodb';

Injectable;
export class AnalystService {
  constructor(
    @InjectRepository(Analyst)
    private readonly userRepository: MongoRepository<Analyst>,
  ) {}

  async findAll(): Promise<Analyst[]> {
    return this.userRepository.find();
  }

  async create(input: Analyst): Promise<Analyst> {
    const status = new Analyst();
    status.name = input.name
    return this.userRepository.save(status);
  }

  async deleteById(id): Promise<Analyst> {
    const data = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    return this.userRepository.remove(data);
  }

  async getById(id): Promise<Analyst> {
    return await this.userRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async updateById(id, input): Promise<Analyst> {
    const data = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    data.name = input.name
    return await this.userRepository.save(data);
  }
}
