import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Auth } from "src/auth/entities/auth.entity";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";

@Injectable()
export class MailRepository extends Repository<Auth>{
    constructor(private readonly dataSource:DataSource){
        super(Auth,dataSource.createEntityManager())
    }
    
    async saveOtp(otp: CreateAuthDto) {

        const verification = this.create({
            otp: otp.otp
        })
        
        await this.save(verification);
        return { message: 'OTP saved successfully'};

        
    }

    async findOtp(otpDto: CreateAuthDto) {
        const verification = await this.findOne({ where: { otp: Number(otpDto.otp) } });
        if (!verification) {
            throw new Error('OTP not found');
        }
        verification.IsVerified = true;
        await this.save(verification);
        return { message: 'verification successful' };
    }
}