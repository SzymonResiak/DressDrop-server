import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({ timeout: 60000, maxRedirects: 10 }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
