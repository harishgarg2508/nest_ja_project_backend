import { Controller, Get, Post } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController{
    constructor(private readonly mailService:MailService){}
    @Post('send')
    async SendMail(){
        return  this.mailService.sendMail()
    }
}