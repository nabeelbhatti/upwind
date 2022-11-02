import { Entity, ObjectIdColumn, Column, PrimaryGeneratedColumn, ObjectID } from "typeorm"

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity('Users')
export class Users {
    @ObjectIdColumn() _id?: ObjectID;
    @Column()
    name: string;

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    token: string

}
