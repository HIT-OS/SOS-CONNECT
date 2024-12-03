import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { CommandHandlers } from './command';
import { JwtConfigService } from '@src/infrastructure/services/jwt.config.service';
import { InfrastructureModule } from '@src/infrastructure/infrastructure.module';
import { QueryHandlers } from './queries';
import { SendMailService } from '@src/domain/utils/send-mail.util';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    HttpModule,
    InfrastructureModule,
  ],
  providers: [...CommandHandlers, ...QueryHandlers, SendMailService],
  exports: [...CommandHandlers, ...QueryHandlers],
})
export class ApplicationModule {}
