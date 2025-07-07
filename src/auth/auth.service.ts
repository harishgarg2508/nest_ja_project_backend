import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UserRepository } from 'src/repository/user.repository';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthUtils } from './auth.utils';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly bcryptService:BcryptService,
    private readonly userRepository:UserRepository,
    private readonly authUtils:AuthUtils
  ){}


  async loginUser(credentials: CreateUserDto,response:Response) {
    const{email,password} = credentials

    const user  = await this.userRepository.findOne({where:{email}})
    if(!user){
      throw new NotFoundException('user not found');

    }
    console.log(user)
    const passwordMatch = await this.bcryptService.comparePassword(password,user.password)
    if(!passwordMatch){
      throw new Error('email or password is incorrect')
    }
    const token = await this.authUtils.generateToken(user)
     response.cookie('accessToken',token,{
      maxAge:1000*1000
     })
    console.log('user logged in')
    return {'token' :  token,
  user: {
    email: user.email,
    displayName:  user.email.split('@')[0],
  }}

   
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
