import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    UserId:number
    @Column()
    email:string
    @Column()
    password:string


}
