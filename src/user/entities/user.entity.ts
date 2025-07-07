import { Auth } from "src/auth/entities/auth.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    userId:number
    @Column()
    email:string
    @Column()
    password:string

    @Column({default: null})
    photoUrl: string;

    @JoinColumn()
    @OneToOne(() => Auth, auth=>auth.user)
    auth: Auth;


}
