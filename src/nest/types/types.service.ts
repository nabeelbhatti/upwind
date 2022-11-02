import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Types } from 'src/entities/types.entity';
import { ObjectId } from 'mongodb';

Injectable;
export class TypesService {
  constructor(
    @InjectRepository(Types)
    private readonly typeRepository: MongoRepository<Types>,
  ) {}

  async findAll(): Promise<Types[]> {
    return this.typeRepository.find();
  }

  async create(input: Types): Promise<Types> {
    const type = new Types();
    type.name = input.name
    return this.typeRepository.save(type);
  }

  async deleteById(id): Promise<Types> {
    const data = await this.typeRepository.findOneBy({ _id: new ObjectId(id) });
    return this.typeRepository.remove(data);
  }

  async getById(id): Promise<Types> {
    return await this.typeRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async updateById(id, input): Promise<Types> {
    const data = await this.typeRepository.findOneBy({ _id: new ObjectId(id) });
    data.name = input.name
    return await this.typeRepository.save(data);
  }
}
