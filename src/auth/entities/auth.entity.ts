import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('auth')
export class Auth {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    otp: number;
  
    @Column({default: false})
    IsVerified: boolean;

    @OneToOne(() => User, user => user.auth)
    user: User;
  
    
}
