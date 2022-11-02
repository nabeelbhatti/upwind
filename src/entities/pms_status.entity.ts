import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';


// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export type StatusFormat = 'pending' | 'In_progress' | 'completed';
@Entity('PMS_Status')
export class Status {
  @ObjectIdColumn() _id?: ObjectID;

  @Column()
  name: string;

}
