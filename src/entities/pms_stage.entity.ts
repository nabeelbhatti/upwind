import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';


// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('PMS_Stages')
export class Stage {
  @ObjectIdColumn() _id?: ObjectID;

  @Column()
  name: string;

}