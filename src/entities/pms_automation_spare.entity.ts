import {
  Entity,
  ObjectIdColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('PMS_file_screening_results')
export class PmsAutomationSpare {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  id: string;

  @Column()
  vessel_id: string;
  @Column()
  file_name: string;

  @Column()
  part_names: string;

  @Column()
  makers: string;

  @Column()
  spare_page_nos: string;
  @Column()
  jobs_found: string;
  @Column()
  jobs_page_nos: string;
  @Column()
  jobs_keyword_freq: any;

  @Column()
  status: string;
}
