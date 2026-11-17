import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService
  ) {}
  
  async register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const userFound = await this.usersService.findByEmailForAuth(loginDto.email);

    if (!userFound) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const isMatch = await bcrypt.compare(loginDto.password, userFound.passwordHash);
      if (!isMatch) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
    return {
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
    };
  }

}
