// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req: any): Promise<any> {
    return this.authService.signIn(req.user);
  }
}
