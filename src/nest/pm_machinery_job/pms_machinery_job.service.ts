import { Injectable } from '@nestjs/common';
import { Job } from 'src/entities/master_jobs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { toArray } from 'rxjs';

Injectable;
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly JobRepository: MongoRepository<Job>,
  ) {}

  async findAll(query: any): Promise<Job[]> {
    const { model, maker, component, offset, client_name } = query;
    console.log(query)
    const skipdata = parseInt(offset, 10);

    const arrayOfMaker = maker && maker != 'null' ? maker.split(',').map(_ => {
          return `${_}`;
        })
      : null;
    const arrayOfmodel = model && model != 'null' ? model.split(',').map(_ => {
          return `${_}`;
        })
      : null;
    const arrOfcomponent = component && component != 'null' ? component.split(',').map(_ => {
          return `${_}`;
        })
      : null;

    const where = {};
    if (arrayOfMaker) {
      where['maker'] = { $in: arrayOfMaker };
    }
    if (arrayOfmodel) {
      where['model'] = { $in: arrayOfmodel };
    }
    if (client_name) {
      where['client_name'] = client_name;
    }
    if (arrOfcomponent) {
      where['component_pathname'] = { $in: arrOfcomponent };
    }
    const searchQuery = {}
    if(Object.keys(where).length > 0){
      searchQuery['where'] = where
    }
    searchQuery['skip'] = skipdata
    searchQuery['take'] = 10
    console.log(searchQuery)

    const data = await this.JobRepository.find(searchQuery);
    return data;
  }

  async create(input: Job): Promise<Job> {
    const job = new Job();
    (job.backflash_trigger = input.backflash_trigger),
      (job.checkist_uid = input.checkist_uid);
    job.client_verification = input.client_verification;
    job.cms_code = input.cms_code;
    job.component_pathname = input.component_pathname;
    job.component_uid = input.component_uid;
    job.created_by = input.created_by;
    job.criticality_uid = input.criticality_uid;
    job.date_of_creation = input.date_of_creation;
    job.date_of_modification = input.date_of_modification;
    job.frequency = input.frequency;
    job.frequency_type_code = input.frequency_type_code;
    job.frequencyactive_status = input.frequencyactive_status;
    job.grace_days = input.grace_days;
    job.index = input.index;
    job.inheritance_flag = input.inheritance_flag;
    job.job_code = input.job_code;
    job.job_completion_permitted = input.job_completion_permitted;
    job.job_description = input.job_description;
    job.job_name = input.job_name;
    job.job_uid = input.job_uid;
    job.lib_component_uid = input.lib_component_uid;
    job.machinery = input.machinery;
    job.maker = input.maker;
    job.model = input.model;
    job.modified_by = input.modified_by;
    job.name_of_clients = input.name_of_clients;
    job.precede_days = input.precede_days;
    job.ra_verified_in_office = input.ra_verified_in_office;
    job.ra_verify_onboard = input.ra_verify_onboard;
    job.range = input.range;
    job.range_days = input.range_days;
    job.require_office_approval = input.require_office_approval;
    job.risk_assessment = input.risk_assessment;
    job.safety_instruction_description = input.safety_instruction_description;
    job.takes_machinery_out_service = input.takes_machinery_out_service;
    job.time_allocation = input.time_allocation;
    job.trigger_date = input.trigger_date;
    job.uid = input.uid;
    job.upwind_uid = input.upwind_uid;
    job.upwind_verification = input.upwind_uid;
    job.verification_status = input.verification_status;
    return this.JobRepository.save(job);
  }
}
