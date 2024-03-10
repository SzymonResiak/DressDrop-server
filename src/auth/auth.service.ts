import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/user/schemes/user';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password, name } = authCredentialsDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      username,
      password: hashedPassword,
      name,
      creationTimestamp: new Date(),
    });
    try {
      await user.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async signIn(user: User) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).select('password');
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
