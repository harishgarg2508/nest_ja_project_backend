import { IsInt, IsString } from "class-validator";

export class CreateUserDto {
    @IsInt()
    userId?:number
    @IsString()
    username:string;

    @IsString()
    password:string;
}
