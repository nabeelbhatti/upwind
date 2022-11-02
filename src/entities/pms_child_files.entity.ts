import { Category } from './categories.entity';
import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';

@Entity('PMS_CHILD_FILES')
export class PmsChildFiles {
  @ObjectIdColumn() _id: ObjectID;

  @Column()
  parent_file_id: string; //will be populate from PmsParentFiles dynamically

  @Column()
  file_detail: {
    file_name: string;
    file_creation_date: Date;
    file_size: string;
    parent_file_name: string;
    folder_name: string;
  };

  @Column()
  batch_number: string;

  @Column(type => Category)
  hull_number_similarity: Category;

  @Column()
  manual_object: {
    manual_code: string;
    manual_name: string;
    manual_type: string;
  };

  @Column()
  appendix_pages: string;

  @Column()
  notes: string;

  @Column()
  result: Category;

  @Column()
  skipped_pages: string;

  @Column()
  screening_date: Date;

  @Column()
  category: Category;

  @Column()
  availability: string;
  @Column()
  title_text: string;

  @Column()
  total_pages: number;

  @Column()
  source_file_name: string;

  @Column()
  component_object: {
    name: string;
    quantity: number;
    maker_name: string;
    maker_address: string;
    model: string;
    specification: string;
    page_reference: string;
  };

  @Column()
  active_status: boolean;

  @Column()
  row_detail: {
    created_by: string;
    modified_by: string;
    creation_date: Date;
    modification_date: Date;
  };
}
