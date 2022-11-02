import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';
import { Category } from 'src/entities/categories.entity';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('PMS_Screening_report_parent')
export class ScreeningReport {
  @ObjectIdColumn() _id?: ObjectID;
  @Column()
  project_id: any;

  @Column()
  batch_number: [];

  @Column()
  last_date: Date;

  @Column()
  report_Date: Date;

  @Column(type => Category)
  status: Category;
}
