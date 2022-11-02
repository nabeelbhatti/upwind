import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';
import { LibClient } from './clients.entity';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('PMS_Project')
export class PmsProject {
  @ObjectIdColumn() _id?: ObjectID;
  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  vessel_type: {};

  @Column()
  category: {};

  @Column()
  building_type: {};

  @Column()
  assignee: [];

  @Column()
  vessel_name: {};

  @Column()
  est_start_date: Date;

  @Column()
  hull_number: string;

  @Column()
  yard_name: {};

  @Column()
  delivery_date: Date;

  @Column()
  gross_tonnage: number;

  @Column()
  summer_dwt: number;

  @Column()
  team_members: {};

  @Column()
  created_by: string;


  @Column()
  modified_by: string;

  @Column()
  vessel_class: {};

  @Column()
  no_of_files_found: number;
  @Column()
  no_of_files_processed: number;
  @Column()
  progress: number;

  @Column()
  clientName: {};

  @Column(type => LibClient)
  clientId: LibClient;

  @Column()
  status: {};

  @Column()
  lastDownloadedDate: Date;

  @Column()
  lastRefreshDate: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column('boolean', { default: false })
  isdeleted: boolean;

  @Column()
  manualSource: string;

  @Column()
  stage: {};

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  targetDate: Date;

  @Column()
  pmsManager: string;
  @Column()
  csv_path: string;
  @Column()
  csv_name: string;

  @Column()
  pmsAnalyst: [];

  @Column()
  noOfFiles: number;

  @Column()
  imoNo: number;

  @Column()
  percentage: number;
}
