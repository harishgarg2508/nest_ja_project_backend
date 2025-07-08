import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  

  @Post('otp')
  verifyOtp(@Body() otp: CreateAuthDto) {
    return this.authService.verifyOtp(otp);
  }

}
