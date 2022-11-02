import { Entity, ObjectIdColumn, Column, ObjectID} from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore

@Entity('Categories')
// @Unique(['code', 'name'])
export class Category {
  @ObjectIdColumn() _id?: ObjectID;

  @Column()
  categoryType: string;


  @Column()
  child: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  catId: string;

  @Column('boolean', { default: false })
  isdeleted: boolean;

}
