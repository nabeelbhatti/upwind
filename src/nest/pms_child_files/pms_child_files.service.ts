import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PmsChildFiles } from 'src/entities/pms_child_files.entity';
import { MongoRepository } from 'typeorm';
import { PmsParentFilesService } from '../pms_parent_files/pms_parent_files.service';
import { Category } from 'src/entities/categories.entity';

@Injectable()
export class PmsChildFilesService {
  constructor(
    @InjectRepository(PmsChildFiles)
    private readonly pmsChildFilesRepository: MongoRepository<PmsChildFiles>,
    private parentFilesService: PmsParentFilesService,
    @InjectRepository(Category)
    private readonly CategoryRepository: MongoRepository<Category>,
  ) {}

  async getFilesByParentFileId(id: string): Promise<PmsChildFiles[]> {
    const childFiles = await this.pmsChildFilesRepository.findBy({
      parent_file_id: id,
    });
    return childFiles;
  }

  async create(pmsChildFiles: PmsChildFiles): Promise<PmsChildFiles> {
    return await this.pmsChildFilesRepository.save(pmsChildFiles);
  }

  async update(id: any, pmsChildFiles: PmsChildFiles): Promise<PmsChildFiles> {
    await this.pmsChildFilesRepository.update(id, pmsChildFiles);
    const childFile = await this.pmsChildFilesRepository.findOneBy({
      _id: new ObjectId(id),
    });
    return childFile;
  }

  async delete(id){
    const childFile = await this.pmsChildFilesRepository.deleteOne({
      _id: new ObjectId(id),
    })
    return childFile;
  }

  async compareFiles(projectId) {
    //get childs of Manual Index
    const manualListParents = await this.parentFilesService.getParentFileById(
      projectId,
      'Manual Index',
    );
    const manualListParentIds = manualListParents.map(res => res._id);
    const allManualListChilds = await this.pmsChildFilesRepository.findBy({
      where: {
        _id: { $in: manualListParentIds },
      },
    });

    //get childs of Source Manual having same project
    const sourceManualParents = await this.parentFilesService.getParentFileById(
      projectId,
      'Source Manual',
    );
    const sourceManualParentIds = sourceManualParents.map(res => res._id);
    const allSourceManualChilds = await this.pmsChildFilesRepository.findBy({
      where: {
        _id: { $in: sourceManualParentIds },
      },
    });

    // compare both childs
    const allUpdatedManulListChilds = [];
    for (let mlFile of allManualListChilds) {
      for (let smFile of allSourceManualChilds) {
        if (
          !!smFile.file_detail.file_name.includes(
            mlFile.manual_object.manual_code,
          ) ||
          !!smFile.file_detail.file_name.includes(
            mlFile.manual_object.manual_name,
          )
        ) {
          mlFile.availability = 'Received';
          mlFile.source_file_name = smFile.file_detail?.file_name;
          break;
        } else {
          mlFile.availability = 'Not Received';
        }
      }
      const updatedFile = await this.update(mlFile._id, mlFile);
      allUpdatedManulListChilds.push(updatedFile);
    }
    return allUpdatedManulListChilds;
  }

  async getAllChildsByParentIdArray(body: any) {
    try {
      const childArray = await this.pmsChildFilesRepository.findBy({
        parent_file_id: { $in: body._id },
      });
      return childArray;
    } catch (error) {
      return error;
    }
  }
  async updateChildFile(id: any, pmsChildFiles: any): Promise<PmsChildFiles> {
    const getManualSource = await this.getCategory(
        'Manual Type',
        pmsChildFiles?.manual_type,
    );
    const getHulkSimilarityNumber = await this.getCategory(
        'Hull Number Similarity',
        pmsChildFiles?.hull_number_similarity,
    );

    pmsChildFiles.hull_number_similarity = getHulkSimilarityNumber;
    pmsChildFiles.manual_object = {
      manual_code: getManualSource.code,
      manual_name: getManualSource.name,
      manual_type: getManualSource.categoryType,
    };
    console.log(pmsChildFiles);

    await this.pmsChildFilesRepository.update(id, pmsChildFiles);
    const childFile = await this.pmsChildFilesRepository.findOneBy({
      _id: new ObjectId(id),
    });
    return childFile;
  }

  async getCategory(type, status): Promise<Category> {
    try {
      const categoryData = await this.CategoryRepository.findOneBy({
        where: {
          name: status,
          categoryType: type,
        },
      });
      return categoryData;
    } catch (error) {
      return error.message;
    }
  }
}
