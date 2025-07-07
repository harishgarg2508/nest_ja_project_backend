import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private readonly dataSource:DataSource){
        super(User,dataSource.createEntityManager())
    }
    
    async createUser(email:string,password:string){

        const user = this.create({
            email,
            password
        })
        await this.save(user);
        return user;

        
    }
}