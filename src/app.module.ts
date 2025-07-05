import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from './config/datasource';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, UserModule,TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
