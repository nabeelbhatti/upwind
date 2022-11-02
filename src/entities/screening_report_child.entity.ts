import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';
import { Category } from 'src/entities/categories.entity';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('PMS_Screening_report_child')
export class ScreeningReportChild {
  @ObjectIdColumn() _id?: ObjectID;
  @Column()
  project_id: any;

  @Column()
  batch_number: [];

  @Column()
  last_date: Date;

  @Column()
  main_machinery: string;

  @Column()
  plant: string;

  @Column()
  type_of_update: string;

  @Column()
  job_status: string;

  @Column()
  spare_status: string;

  @Column()
  screening_remarks: string;

  @Column()
  vessels_type: string;
}
