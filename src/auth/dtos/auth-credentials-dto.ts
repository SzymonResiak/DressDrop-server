import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  @ApiProperty({ minLength: 4, maxLength: 32 })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(64, { message: 'Password is too long (64 characters max)' })
  @ApiProperty({ minLength: 4, maxLength: 64 })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
