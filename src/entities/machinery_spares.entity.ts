import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';


// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('pms_machinery_Spears')
export class Spears {
  @ObjectIdColumn() _id?: ObjectID;

  @Column()
  name: string;

  @Column()
  uid: string;

  @Column()
  index: number;

  @Column()
  expiry_range: number;

  @Column()
  active_status: number;

  @Column()
  created_by: number;

  @Column()
  spare_uid: string;

  @Column()
  date_of_creation: string;

  @Column()
  lib_component_uid: string;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  upwind_uid: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  price_replacement: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  price_oem: number;
  
  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  price_original: number;
  
  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  quantity_max: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  quantity_min: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  verification_status: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  jibe_verification_flag: number;

  @Column()
  unit_of_measurement_uid: string;

  @Column()
  criticality_uid: string;

  @Column()
  drawing_number: string;

  @Column()
  drawing_position: string;

  @Column()
  component_pathname: string;

  @Column()
  inheritance_flag: string;

  @Column()
  model: any;

  @Column()
  maker: any;
  @Column()
  date_of_modification: string;

  @Column()
  dimensions: string;

  @Column()
  machinery: string;
  
  @Column()
  name_of_clients: string;

  @Column()
  part_number: string;

  @Column()
  part_name: string;

  @Column()
  maker_uid: string;

  @Column()
  description: string;

}