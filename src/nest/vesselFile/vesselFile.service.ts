import { Injectable } from '@nestjs/common';
import { VesselFile } from 'src/entities/vesselFile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

// import { v4 as uuidv4 } from 'uuid';

Injectable;
export class VesselFileService {
  constructor(
    @InjectRepository(VesselFile)
    private readonly userRepository: MongoRepository<VesselFile>,
  ) {}
  }