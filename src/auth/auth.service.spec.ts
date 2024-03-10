import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schemes/user';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, name, type } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      username,
      password: hashedPassword,
      name,
      type: new Types.ObjectId(type),
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

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).select('password');

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }
}
