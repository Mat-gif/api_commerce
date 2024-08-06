import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/interfaces/jwt-payload.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
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

  async register(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    console.log(existingUser);
    if (existingUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email already use.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.saltRounds,
    );

    console.log({
      ...createUserDto,
      password: hashedPassword,
    });

    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const payload: JwtPayload = { sub: user.id, email: user.email };

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
}
