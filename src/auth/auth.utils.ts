import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/create-user.dto";

@Injectable()
export class AuthUtils{
    constructor(private readonly jwtService:JwtService){}
    async generateToken(user:CreateUserDto){
        const {userId} = user
    
        const accessToken = await this.jwtService.sign({ userId: user.userId ,},{
            secret:process.env.JWT_SECRET,
            
        
        })

        return accessToken;

    }
}