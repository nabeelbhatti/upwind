import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';
import { Spears } from './machinery_spares.entity';
import { Job } from './master_jobs.entity';


// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('OCR_results')
export class OcrResult {
  @ObjectIdColumn() _id?: ObjectID;

  @Column()
  file_name: string;

  @Column()
  vessel_id: string;

  @Column()
  makers_model: string;

  @Column()
  page_no: number;

  @Column()
  makers: [];

  @Column()
  component_names: [];

  @Column()
  model_names: [];

  @Column()
  part_names: [];

  @Column(type => Job)
  related_jobs: Job[];

  @Column(type=>Spears)
  related_spears: any[];

}