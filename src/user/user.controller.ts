import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response, response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly authService:AuthService
  ) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() createUserDto: CreateUserDto,@Res({passthrough:true}) response:Response) {
    return this.authService.loginUser(createUserDto,response)
  }

  @Patch('update-avatar')
async updateAvatar(@Body() updateData: { email: string; photoUrl: string }) {
  return this.userService.updateAvatar(updateData);
}



  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
