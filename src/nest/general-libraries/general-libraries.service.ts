import { Injectable } from '@nestjs/common';
import { Db, InsertOneResult, ModifyResult, MongoClient, ObjectId, UpdateResult, WithId } from 'mongodb';
import { Document as BSONDocument } from 'bson';

Injectable;
export class GeneralLibrariesService {
  private dbo: Db;
  constructor(
  ) {
    /** TODO: replace it with TypeORM */
    MongoClient.connect(process.env.DATABASE_URL, (err, db) => {
      if (err) throw err;
      this.dbo = db.db(process.env.DATABASE);
    });
  }

  public async find(type: string): Promise<WithId<BSONDocument>[]> {
    this.validateRepositoryName(type);
    return this.dbo.collection(type).find({}).toArray();
  }

  private validateRepositoryName(type: string): void {
    const allowedTypes = this.getAllowedTypes()

    if (!allowedTypes[type]) {
      throw Error(`'${type}' type is not allowed`);
    }
  }

  public getAllowedTypes(): Record<string, string> {
    return {
      'Lib_Alarm_Keyword': 'Alarm Keyword',
      'Lib_Component_AliasName': 'Component Alias Name Library',
      'Lib_Componenttype_Keyword': 'ComponentType Library',
      'Lib_Job_Keyword': 'Jobs Keyword',
      'Lib_Maker_Keyword': 'Maker Library',
      'Lib_Model_Keywords': 'Model Library',
      'Lib_Root_Component_Library': 'Root Component Library',
      'Lib_Screening_Report_Library': 'Screening Report Library',
      'Lib_SerialNumber_Keyword': 'Serial Number Keyword',
      'Lib_ShellComponent_Library': 'Shell Component Library',
      'Lib_Spares_Keywords': 'Spares Keyword',
      'Lib_Specification_Keyword': 'Specification Keyword',
      'Lib_Tags_Library': 'Tags Library',
    };
  }

  public async create(type: string, input: any): Promise<InsertOneResult<Document>> {
    this.validateRepositoryName(type);
    return this.dbo.collection(type).insertOne(input);
  }

  public async update(type: string, input: any): Promise<UpdateResult> {
    const { _id, ...newData } = input;
    this.validateRepositoryName(type);
    return this.dbo.collection(type).updateOne(
      {
        _id: new ObjectId(_id),
      },
      { $set: newData }
    );
  }

  public async deleteById(type: string, id: string): Promise<ModifyResult<BSONDocument>> {
    this.validateRepositoryName(type);
    return this.dbo.collection(type).findOneAndDelete({
      _id: new ObjectId(id)
    });
  }
}
