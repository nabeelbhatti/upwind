import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore

@Entity('Types')
export class Types {
  @ObjectIdColumn() _id?: ObjectID;

  @Column()
  name: string;
}
