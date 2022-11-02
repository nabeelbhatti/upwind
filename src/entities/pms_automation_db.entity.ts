import { Entity, ObjectIdColumn, Column, PrimaryGeneratedColumn } from "typeorm"

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('pms_automation_db')
export class PmsAutomationDb {
    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    id: string;

    @Column()
    file_name: string

    
}
