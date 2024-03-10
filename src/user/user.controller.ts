import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemes/user';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
