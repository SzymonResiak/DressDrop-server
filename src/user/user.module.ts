import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemes/user';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  exports: [UserService, MongooseModule],
  providers: [UserService],
})
export class UserModule {}
