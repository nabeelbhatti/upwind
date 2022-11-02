import { Injectable } from '@nestjs/common';
import { PmsProject } from 'src/entities/pms_project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MongoRepository } from 'typeorm';
import { ObjectId, UpdateResult } from 'mongodb';
import { LibClient } from '../../entities/clients.entity';
import { PythonShell } from 'python-shell';

Injectable;
export class PmsProjectServices {
  constructor(
    @InjectRepository(PmsProject)
    private readonly pmsProjectRepository: MongoRepository<PmsProject> | any,
    @InjectRepository(LibClient)
    private readonly clientRepository: MongoRepository<LibClient>,
  ) { }

  async findAll(name): Promise<PmsProject[]> {
    if (name) {
      return this.pmsProjectRepository.find({
        where: {
          isdeleted: false,
          clientName: Like(`%${name}%`),
        },
        order: {
          _id: 'DESC',
        },
      });
    } else {
      return this.pmsProjectRepository.find({
        where: {
          isdeleted: false,
        },
        order: {
          _id: 'DESC',
        },
      });
    }
  }

  async getClient(name): Promise<LibClient> {
    try {
      let ClientName = await this.clientRepository.findOneBy({
        clientName: name,
      });
      return ClientName
    } catch (error) {
      return error.message;
    }
  }

  async deleteById(id): Promise<PmsProject> {
    const data = await this.pmsProjectRepository.findOneBy({ _id: new ObjectId(id) });
    console.log(data.imoNo,data.hull_number,data.yard_name);
    if (data.imoNo == null && data.hull_number == null && data.yard_name == null) {
      const UpdatedData = await this.pmsProjectRepository.updateOne(
        { _id: new ObjectId(id) },
        { $set: { isdeleted: true } }
      );
      return data
    }else{
      return null
    }
    
  }

  async getById(id): Promise<PmsProject> {
    return await this.pmsProjectRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async create(input: PmsProject | any): Promise<PmsProject> {
    const libClient = await this.getClient(input.clientName.name);
    console.log(libClient);
    const vessel = new PmsProject();
    vessel.name = input.name;
    vessel.vessel_name = input.vesselName;
    vessel.url = input.url;
    vessel.clientId = libClient;
    vessel.createdAt = new Date();
    vessel.status = 'Pending';
    vessel.updatedAt = null;
    vessel.isdeleted = false;
    vessel.clientName = input.clientName;
    vessel.startDate = input.startDate;
    vessel.endDate = input.endDate;
    vessel.targetDate = input.targetDate;
    vessel.pmsManager = input.pmsManager;
    vessel.pmsAnalyst = input.pmsAnalyst;
    vessel.noOfFiles = input.noOfFiles;
    vessel.imoNo = input.imoNo;
    vessel.stage = input.stage;
    vessel.vessel_class = input.vesselClass;
    vessel.vessel_type = input.vesselType;
    vessel.category = input.category;
    vessel.building_type = input.typeOfBuilding;
    vessel.assignee = input.assignee;
    vessel.est_start_date = input.estStartDate;
    vessel.hull_number = input.hull_number;
    vessel.yard_name = input.yard_name;
    vessel.delivery_date = input.delivery_date;
    vessel.gross_tonnage = input.gross_tonnage;
    vessel.summer_dwt = input.summer_dwt;
    vessel.team_members = input.team_members;
    vessel.created_by = input.created_by;

    const DocToSave = await this.pmsProjectRepository.save(vessel);

    return DocToSave
  }

  async updateById(id, input): Promise<PmsProject> {
    try {
      const data = await this.pmsProjectRepository.findOneBy({
        _id: new ObjectId(id),
      });
      const libClient = await this.getClient(input.clientName);
      data.updatedAt = new Date();
      data.isdeleted = false;
      // data.name = input.vesselName;
      // data.clientName = libClient.clientName;
      // data.vessel_name = input.vesselName;
      data.vessel_type = input.vesselType;
      data.category = input.category;
      data.building_type = input.typeOfBuilding;
      data.est_start_date = input.estStartDate;
      data.targetDate = input.estEndDate;
      data.url = input.url;
      data.assignee = input.assignee;
      const data2 = await this.pmsProjectRepository.update(id, data);
      // return await this.userRepository.save(data);
      return data2;
    } catch (error) {
    }
  }

  async getDownloadDate(id): Promise<PmsProject> {
    const data = await this.pmsProjectRepository.findOneBy({ _id: new ObjectId(id) });

    data.lastDownloadedDate = new Date();
    return this.pmsProjectRepository.save(data);
    // return this.userRepository.remove(data)
  }
  scriptRunner = async (id, data) => {
    try {
      const options = {
        pythonOptions: ['-u'], // get print results in real-time
        // args: ['/home/upwind/Databuilding/Shared Documents/AESM/AE Technical & Maintenance Manual'],
        args: [`/home/upwind/Databuilding/Shared Documents/${data.url}`, id],
        scriptPath: process.env.SCRIPT_PATH,
      };

      const res = await PythonShell.run('main.py', options, function () {
      });
      res.stdout.on('data', function (data) {
      });
    } catch (e) {
    }
  }

  async getResfreshDate(id): Promise<UpdateResult> {
    try {
      // await this.userRepository.updateOne({_id: id}, {status: 'In Progress'});
      const data = await this.pmsProjectRepository.findOneBy({ _id: new ObjectId(id) });
      this.scriptRunner(id, data)
      //  @ts-ignore
      const DocToUpdate = await this.userRepository.update(
        {
          _id: id,
        },
        {
          status: 'In_Progress',
          lastRefreshDate: new Date(),
        },
      );

      return DocToUpdate;
      // return this.userRepository.remove(data)
    } catch (error) {
      return error.message;
    }
  }

  async GetParticualrVesselInformationFromPmsProject(data: any) {
    const { ClientName, VesselName } = data;
    const DocToGet = await this.pmsProjectRepository.findOneBy(
      { $and: [{ 'vessel_name.name': VesselName }, { 'clientName.name': ClientName }, { 'isdeleted': { $ne: true } }] }
    )
    return DocToGet
  }

  async UpdatePmsFieldsFromVessel(data: any) {
    const body = data;
    const DocToUpdate = await this.pmsProjectRepository.updateOne(
      { _id: new ObjectId(data.id) },
      {
        $set:
        {
          imoNo: body.imoNo,
          hull_number: body.hull_number,
          yard_name: body.yard_name,
          gross_tonnage: body.gross_tonnage,
          delivery_date: body.delivery_date,
          startDate: body.startDate,
          targetDate: body.targetDate,
          endDate: body.endDate,
          stage: body.stage,
          status: body.status,
          pmsAnalyst: body.pmsAnalyst,
          team_members: body.team_members,
          summer_dwt: body.summer_dwt,
          vessel_class: body.vessel_class,
        }
      }
    )
    return DocToUpdate
  }
}

