import { Category } from 'src/entities/categories.entity';
import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';

@Entity('PMS_PARENT_FILES')
export class PmsParentFiles {
  @ObjectIdColumn() _id: ObjectID;

  @Column()
  project_id: string; //will be populate from PMS_PROJECT dynamically

  @Column()
  file_detail: {
    sharepoint_url: string;
    fileName: string;
    fileType: string;
  };

  @Column(type =>Category)
  status: Category;

  @Column()
  name: Category;

  @Column()
  number_of_files: number;

  @Column()
  batch_number: string;

  @Column()
  date_received: Date;

  @Column()
  screening_received: Date;

  @Column()
  progress: string;

  @Column()
  category: Category;

  @Column()
  mapping_object: {
    code_mapping: string;
    name_mapping: string;
    qty_mapping: string;
    maker_mapping: string;
    model_mapping: string;
    specification_mapping: string;
    maker_address_mapping: string;
  };

  @Column()
  start_page: number;

  @Column()
  categoryType: Category;

  @Column()
  end_page: number;

  @Column()
  active_status: boolean;

  @Column()
  row_activity: {
    created_by: string;
    modified_by: string;
    creation_date: Date;
    modification_date: Date;
  };
}
