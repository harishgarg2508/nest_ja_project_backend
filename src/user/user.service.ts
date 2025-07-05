import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/repository/user.repository';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository:UserRepository,
    private readonly bcryptService:BcryptService){}
    
  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const hashedPassword = await this.bcryptService.hashPassword(password);
    return this.userRepository.createUser(username, hashedPassword);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
