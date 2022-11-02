
import { Entity, ObjectIdColumn, Column,  ObjectID } from "typeorm"

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('VesselFile')
export class VesselFile {
 
  @ObjectIdColumn() id?: ObjectID;

  @Column()
  vessel_id: string;

  @Column()
  uploadpath: string;

}
