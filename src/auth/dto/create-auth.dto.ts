import { IsInt } from "class-validator";

export class CreateAuthDto {

    @IsInt()
    otp: number;
}
