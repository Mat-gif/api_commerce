import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    description: 'User registration details',
    type: UserDto,
    examples: {
      'application/json': {
        value: {
          email: 'user@example.com',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    schema: {
      example: {
        status: HttpStatus.CREATED,
        message: 'User successfully registered.',
        data: {
          access_token: 'your-jwt-token-here',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async register(@Body() userDto: UserDto) {
    const token = await this.authService.register(userDto);
    return {
      status: HttpStatus.CREATED,
      message: 'User successfully registered.',
      data: token,
    };
  }

  @Post('login')
  @ApiBody({
    description: 'User login details',
    type: UserDto,
    examples: {
      'application/json': {
        value: {
          email: 'user@example.com',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully logged in.',
    schema: {
      example: {
        status: HttpStatus.CREATED,
        message: 'User successfully logged in.',
        data: {
          access_token: 'your-jwt-token-here',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async login(@Body() userDto: UserDto) {
    const token = await this.authService.login(userDto);
    return {
      status: HttpStatus.OK,
      message: 'User successfully logged in.',
      data: token,
    };
  }
}
