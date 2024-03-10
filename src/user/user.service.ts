import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemes/user';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  async getUsers(userId?: string): Promise<User[]> {
    const filter: { [key: string]: any } = {};
    if (userId) filter._id = new Types.ObjectId(userId);
    const query = this.userModel.find(filter).select('name').sort('name');
    query.lean();

    return await query;
  }
}
