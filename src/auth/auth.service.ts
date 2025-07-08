import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UserRepository } from 'src/repository/user.repository';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthUtils } from './auth.utils';
import { Response } from 'express';
import { MailRepository } from 'src/repository/mail.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly userRepository: UserRepository,
    private readonly authUtils: AuthUtils,
    private readonly mailRepository: MailRepository,
  ) {}

  async loginUser(credentials: CreateUserDto, response: Response) {
  const { email, password } = credentials;

  const user = await this.userRepository.findOne({ 
    where: { email },
    relations: ['auth'] 
  });
  
  if (!user) {
    throw new NotFoundException('User not found');
  }
  
  console.log(user);
  
  const passwordMatch = await this.bcryptService.comparePassword(
    password,
    user.password,
  );
  
  if (!passwordMatch) {
    throw new Error('Email or password is incorrect');
  }
  
  const token = await this.authUtils.generateToken(user);
  
  response.cookie('accessToken', token, {
    maxAge: 1000 * 60 * 60 * 24, 
  });
  
  console.log('User logged in');
  
  return {
    token: token,
    user: {
      email: user.email,
      displayName: user.email.split('@')[0],
      photoURL: user.photoUrl || null,
      isEmailVerified: user.auth?.IsVerified, 
    },
  };
}

  verifyOtp(otp: CreateAuthDto) {
    return this.mailRepository.findOtp(otp);
  }

}
