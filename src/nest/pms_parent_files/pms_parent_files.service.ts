import { Input } from '@angular/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PmsParentFiles } from 'src/entities/pms_parent_files.entity';
import { MongoRepository } from 'typeorm';
import { Category } from 'src/entities/categories.entity';
import axios from 'axios';

@Injectable()
export class PmsParentFilesService {
  constructor(
    @InjectRepository(PmsParentFiles)
    private readonly PmsParentFilesRepository: MongoRepository<PmsParentFiles>,
    @InjectRepository(Category)
    private readonly CategoryRepository: MongoRepository<Category>,
  ) {}

  async create(input: any): Promise<PmsParentFiles> {
    try {
      const getCategoryData = await this.getCategory('Open');
      input.status = getCategoryData;
      const docToSave = await this.PmsParentFilesRepository.save(input);
      return docToSave;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getParentFileById(id, type) {
    try {
      const doc = await this.PmsParentFilesRepository.findBy({
        $and: [{ project_id: id }, { 'file_detail.fileType': type }],
      });
      return doc;
    } catch (error) {
      return error;
    }
  }

  async updateParentFileById(id, body) {
    try {
      const doc = await this.PmsParentFilesRepository.update(id, body);
      return doc;
    } catch (error) {
      return error;
    }
  }

  async deleteParentFileByID(id) {
    try {
      const doc = await this.PmsParentFilesRepository.deleteOne({
        _id: new ObjectId(id),
      });
      return doc;
    } catch (error) {
      return error;
    }
  }

  async getCategory(status): Promise<Category> {
    try {
      const categoryData = await this.CategoryRepository.findOneBy({
        where: {
          name: status,
          categoryType: 'Status',
        },
      });
      return categoryData
    } catch (error) {
      return error.message;
    }
  }

  
  async getSingleParentFileById(id) {
    try {
      const doc = await this.PmsParentFilesRepository.findOneBy({
        _id: new ObjectId(id),
      });
      return doc;
    } catch (error) {
      return error;
    }
  }

  async updateStatus(id: any): Promise<any> {
    const getCategoryData = await this.getCategory('In Progress');
    console.log(getCategoryData);
    const Data = await this.PmsParentFilesRepository.findOneBy({
      _id: new ObjectId(id),
    });
    Data.status = getCategoryData;
    axios
      .post('http://43.204.82.5:5000/post-screening-source-files-od-folder', {
        id: Data._id,
        sharepoint_url:Data.file_detail.sharepoint_url.split('&id=%2F')[1].split('&')[0],
        folder_url: Data.file_detail.sharepoint_url
      })
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
    console.log('python end');

    const data = await this.PmsParentFilesRepository.update(id, Data);
    return data;
  }

  async update(id: any): Promise<any> {
    const getCategoryData = await this.getCategory('Extracted');
    const Data = await this.PmsParentFilesRepository.findOneBy({
      _id: new ObjectId(id),
    });
    Data.status = getCategoryData;
    axios
      .post('http://43.204.82.5:5000/source_manual', {
        id: Data._id,
        project_id: id,
        file_details: { 
          sharepoint_url: Data.file_detail.sharepoint_url.split('&id=%2F')[1].split('&')[0],
          folder_url: Data.file_detail.sharepoint_url
        },
        batch_number: Data.batch_number,
        date_recieved: Data.date_received,
      })
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
    console.log('python end');

    const data = await this.PmsParentFilesRepository.update(id, Data);
    return data;
  }

}
