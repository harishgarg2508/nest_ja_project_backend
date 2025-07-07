import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsInt()
    @IsOptional()
    userId?:number
    
    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    password:string;
}
