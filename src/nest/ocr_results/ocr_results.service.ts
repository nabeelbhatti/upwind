import { Injectable } from '@nestjs/common';
import { OcrResult } from 'src/entities/ocr_results.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Job } from 'src/entities/master_jobs.entity';
import { Spears } from 'src/entities/machinery_spares.entity';


Injectable;
export class OcrService {
  constructor(
    @InjectRepository(OcrResult)
    private readonly ocrResultRepository: MongoRepository<OcrResult>,
    @InjectRepository(Job)
    private readonly jobRepository: MongoRepository<Job>,
    @InjectRepository(Spears)
    private readonly spearRepository: MongoRepository<Spears>,
  ) {}

  async findAll(id): Promise<OcrResult[]> {
    return this.ocrResultRepository.find({
      where: {
        vessel_id: id,
      },
    });
  }

  async createJob(id, input) {
    try {
      const data = await this.ocrResultRepository.findOneBy({
        _id: new ObjectId(id),
      });
      if (!data.related_jobs) {
        const arr = [];
        for (const x of input) {
          const singleJob = await this.getJob(x);
          arr.push(singleJob);
        }
        data.related_jobs = arr;
        return await this.ocrResultRepository.update(id, data);
      } else {
        const arr = data.related_jobs.map(_ => {
          return _._id
            .toString()
            .split('"')
            .toString();
        });
        const intersection = input.filter(x => !arr.includes(x));
        const Job = [];
        for (const x of intersection) {
          const arrayofJobs = await this.getJob(x);
          Job.push(arrayofJobs);
        }
        data.related_jobs = [...data.related_jobs, ...Job];
        const data2 = await this.ocrResultRepository.update(id, data);
        return data;
      }
    } catch (error) {}
  }

  async createSpears(id, input) {
    try {
      const data = await this.ocrResultRepository.findOneBy({
        _id: new ObjectId(id),
      });
      if (!data.related_spears) {
        const arr = [];
        for (const x of input) {
          const singleJob = await this.getSpears(x);
          arr.push(singleJob);
        }
        data.related_spears = arr;
        return await this.ocrResultRepository.update(id, data);
      } else {
        const arr = data.related_spears.map(_ => {
          return _._id
              .toString()
              .split('"')
              .toString();
        });
        const intersection = input.filter(x => !arr.includes(x));
        const Job = [];
        for (const x of intersection) {
          const arrayofJobs = await this.getSpears(x);
          Job.push(arrayofJobs);
        }
        data.related_spears = [...data.related_spears, ...Job];
         await this.ocrResultRepository.update(id, data);
        return data;
      }
    } catch (error) {}
  }

  async getJob(name): Promise<Job> {
    return this.jobRepository.findOneBy({
      _id: new ObjectId(name),
    });
  }

  async getSpears(name): Promise<Spears> {
    return this.spearRepository.findOneBy({
      _id: new ObjectId(name),
    });
  }

  async deleteJobs(id, input) {
    try {
      const data = await this.ocrResultRepository.findOneBy({
        _id: new ObjectId(id),
      });
      const converter = id => {
        return id
          .toString()
          .split('"')
          .toString();
      };
      const filterJobs = data.related_jobs.filter(
        x => !input.deleted_jobs.includes(converter(x._id)),
      );
      data.related_jobs = filterJobs;
      await this.ocrResultRepository.update(id, data);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  async deleteSpears(id, input) {
    try {
      const data = await this.ocrResultRepository.findOneBy({
        _id: new ObjectId(id),
      });
      const converter = id => {
        return id
          .toString()
          .split('"')
          .toString();
      };
      const filterJobs = data.related_spears.filter(
        x => !input.deleted_jobs.includes(converter(x._id)),
      );
      data.related_spears = filterJobs;
      await this.ocrResultRepository.update(id, data);
      return data
    } catch (error) {
      console.log(error);
    }
  }
}
