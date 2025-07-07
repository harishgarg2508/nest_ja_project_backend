import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mailConfig from 'src/config/mailConfig';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailRepository } from 'src/repository/mail.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mailConfig],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: configService.get('mailer.transport'),
        defaults: configService.get('mailer.defaults'),        
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService, ConfigService,MailRepository],
  exports: [MailService],
})
export class MailModule {}