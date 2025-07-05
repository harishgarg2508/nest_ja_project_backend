import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    UserId:number
    @Column()
    username:string
    @Column()
    password:string


}
