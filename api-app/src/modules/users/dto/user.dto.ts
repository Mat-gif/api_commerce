import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: "The user's password",
    example: 'password123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: "The user's email address",
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
}
