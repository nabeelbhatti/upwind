import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Manager } from 'src/entities/pms_manager.entity';
import { ObjectId } from 'mongodb';

Injectable;
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: MongoRepository<Manager>,
  ) {}

  async findAll(): Promise<Manager[]> {
    return this.managerRepository.find();
  }

  async create(input: Manager): Promise<Manager> {
    const status = new Manager();
    status.name = input.name
    return this.managerRepository.save(status);
  }

  async deleteById(id): Promise<Manager> {
    const data = await this.managerRepository.findOneBy({ _id: new ObjectId(id) });
    return this.managerRepository.remove(data);
  }

  async getById(id): Promise<Manager> {
    return await this.managerRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async updateById(id, input): Promise<Manager> {
    const data = await this.managerRepository.findOneBy({ _id: new ObjectId(id) });
    data.name = input.name
    return await this.managerRepository.save(data);
  }
}
