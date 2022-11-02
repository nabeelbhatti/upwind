import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('Master_Job_list')
export class Job {
  @ObjectIdColumn() _id?: ObjectID;

  @Column()
  job_name: string;

  @Column()
  client_name: string;

  @Column()
  date_of_creation: string;

  @Column()
  date_of_modification: string;

  @Column()
  machinery: string;

  @Column()
  inheritance_flag: string;

  @Column()
  name_of_clients: string;

  @Column()
  maker: any;

  @Column()
  model: any;

  @Column()
  component_uid: string;

  @Column()
  ra_verify_onboard: number;

  @Column()
  index: number;

  @Column()
  component_pathname: any;

  @Column()
  "client name": string

  @Column()
  job_code: number;

  @Column()
  frequency: number;

  @Column()
  frequencyactive_status: number;

  @Column()
  created_by: number;

  @Column()
  ra_verified_in_office: number;

  @Column()
  criticality_uid: string;

  @Column()
  frequency_type_code: string;

  @Column()
  job_description: string;

  @Column()
  job_uid: string;

  @Column()
  uid: string;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  risk_assessment: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  modified_by: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  dangerous_goods: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  material_uid: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  vessel_uid: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  upwind_uid: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  lib_component_uid: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  jibe_verification_flag: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  position_number: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  verification_status: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  takes_machinery_out_service: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  safety_instruction_description: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  client_verification: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  upwind_verification: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  checkist_uid: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  require_office_approval: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  precede_days: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  grace_days: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  backflash_trigger: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  cms_code: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  range_days: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  time_allocation: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  trigger_date: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  job_completion_permitted: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  range: number;

}
