import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import {Spears} from 'src/entities/machinery_spares.entity'


Injectable;
export class SpearsService {
  constructor(
    @InjectRepository(Spears)
    private readonly spearsRepository: MongoRepository<Spears>,
  ) {}

  async findAll(query: any): Promise<Spears[]> {
    console.log("query data is ", query)
    const { model, maker, component, offset, client_name } = query;

    const skipdata = parseInt(offset, 10)
    const arrayOfMaker = maker !== 'null' ? maker.split(',').map(_ => {
        return `${_}`;
      })
    : null;
  const arrayOfmodel = model !== 'null' ? model.split(',').map(_ => {
        return `${_}`;
      })
    : null;
  const arrOfcomponent = component !== 'null' ? component.split(',').map(_ => {
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
      where['client name'] = client_name;
    }

    if (arrOfcomponent) {
      where['component_pathname'] = { $in: arrOfcomponent };
    }

    return this.spearsRepository.find({
      where:  where,
      skip: skipdata,
      take: 10,
    });

  }

  async create(input: Spears): Promise<Spears> {
    const spears = new Spears();
    spears.active_status = input.active_status
    spears.component_pathname = input.component_pathname
    spears.created_by = input.created_by
    spears.criticality_uid = input.criticality_uid
    spears.date_of_creation = input.date_of_creation
    spears.date_of_modification = input.date_of_modification
    spears.description = input.description
    spears.dimensions = input.dimensions
    spears.drawing_number = input.drawing_number
    spears.expiry_range = input.expiry_range
    spears.index = input.index
    spears.inheritance_flag = input.inheritance_flag
    spears.jibe_verification_flag = input.jibe_verification_flag
    spears.lib_component_uid = input.lib_component_uid
    spears.machinery = input.machinery
    spears.maker = input.maker
    spears.maker_uid = input.maker_uid
    spears.model = input.model
    spears.name = input.name
    spears.verification_status = input.verification_status
    spears.upwind_uid = input.upwind_uid
    spears.unit_of_measurement_uid = input.unit_of_measurement_uid
    spears.uid = input.uid
    spears.spare_uid = input.spare_uid
    spears.quantity_min = input.quantity_min
    spears.quantity_max = input.quantity_max
    spears.price_replacement = input.price_replacement
    spears.price_original = input.price_original
    spears.price_oem = input.price_oem
    spears.part_number = input.part_name
    return this.spearsRepository.save(spears);
  }
}
