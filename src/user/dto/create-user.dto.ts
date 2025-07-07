import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsInt()
    userId?:number
    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    password:string;
}
