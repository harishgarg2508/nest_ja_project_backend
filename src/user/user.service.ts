import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from 'src/repository/user.repository';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository:UserRepository,
    private readonly bcryptService:BcryptService){}
    
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const hashedPassword = await this.bcryptService.hashPassword(password);
    return this.userRepository.createUser(email, hashedPassword);
  }

  async updateAvatar(updateData: { email: string; photoUrl: string }) {
      const { email, photoUrl } = updateData;
  
  const user = await this.userRepository.findOne({ where: { email } });
  
  if (!user) {
    throw new NotFoundException('User not found');
  }
  
  user.photoUrl = photoUrl;
  const updatedUser = await this.userRepository.save(user);
  
  return {
    success: true,
    photoUrl: updatedUser.photoUrl,
    message: 'Avatar updated successfully',
  };
  }

}
