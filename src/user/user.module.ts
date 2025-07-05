import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repository/user.repository';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[BcryptModule,AuthModule],
  controllers: [UserController],
  providers: [UserService,UserRepository],
})
export class UserModule {}
