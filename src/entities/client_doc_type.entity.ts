import { ObjectId } from "mongodb";
import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./categories.entity";

@Entity('CLIENT_DOC_TYPE')
export class ClientDocType {
    @PrimaryGeneratedColumn()
    @ObjectIdColumn() _id: ObjectID;
    @Column() client: { 
        _id: ObjectId,  
         categoryType: string,  
         name: string,  
         code: string,  
         catId: string  
      };
    @Column() doc_type: Category;
    @Column() share_point_link: string;
    @Column() file_name: string;
    @Column() version_number: string;
    @Column() date_received: Date;
    @Column() status: Category;
    @Column() fleet_type: Category;
    @Column() comments: string;
    @Column() active_status: boolean;
    @Column() row_activity: {
        created_by: string,
        modified_by: string,
        creation_date: Date,
        modification_date: Date
    }
}