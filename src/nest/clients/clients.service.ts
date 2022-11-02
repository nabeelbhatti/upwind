import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { LibClient } from 'src/entities/clients.entity';

Injectable;
export class ClientServices {
  constructor(
    @InjectRepository(LibClient)
    private readonly clientRepository: MongoRepository<LibClient>,
  ) {}

  async findAll(): Promise<LibClient[]> {
    return this.clientRepository.find();
  }
}
