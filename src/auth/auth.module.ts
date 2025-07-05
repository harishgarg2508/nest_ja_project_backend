import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { UserRepository } from 'src/repository/user.repository';
import { AuthUtils } from './auth.utils';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[BcryptModule,JwtModule],
  controllers: [AuthController],
  providers: [AuthService,UserRepository,AuthUtils],
  exports:[AuthService]
})
export class AuthModule {}
