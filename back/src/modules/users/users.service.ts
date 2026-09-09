import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //*Create services
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      passwordHash,
    });
    const savedUser = await this.userRepository.save(user);
    return {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
    };
  }

  //*Read services
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    }));
  }

  async findById(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
  /*
  async findByUsername(username: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
    */
  //*Update Services
  async update(id: string, updateUserDto: any): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      user.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.userRepository.save(user);
    return {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
    };
  }
}
