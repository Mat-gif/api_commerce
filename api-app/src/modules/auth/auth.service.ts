import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/interfaces/jwt-payload.interface';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../../entity/user.entity';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: UserDto): Promise<{ access_token: string }> {
    const existingUser = await this.usersService.findByEmail(userDto.email);
    if (existingUser) {
      throw new HttpException('Email already in use.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(userDto.password, this.saltRounds);

    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });

    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
    };
  }

  async validateUser(userDto: UserDto): Promise<User> {
    const user = await this.usersService.findByEmail(userDto.email);
    if (!user) {
      throw new HttpException('Email not found.', HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Invalid password.', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);

    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
    };
  }
}
