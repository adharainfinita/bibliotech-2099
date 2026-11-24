import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { LibraryResponseDto } from './dto/library-response.dto';
import { Book } from '../books/entities/books.entity';
import { PublicUserResponseDto } from './dto/public-user-response.dto';

interface PostgresError {
  code: string;
  detail?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //*Create services
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUsername = await this.userRepository.findOne({
  where: { username: createUserDto.username },
  });

  if (existingUsername) {
    throw new ConflictException('El nombre de usuario ya está registrado');
  }

  const existingEmail = await this.userRepository.findOne({
    where: { email: createUserDto.email },
  });

  if (existingEmail) {
    throw new ConflictException('El email ya está registrado');
  }
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      passwordHash,
    });
    try {
      const savedUser = await this.userRepository.save(user);
      return {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
      }
    } catch (error) { 
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as PostgresError;
        if (driverError.code === '23505') {
          throw new ConflictException('El nombre de usuario o email ya está registrado');
        }
      }
      throw error;
    }
  }

  //*Read services
  async findAll(): Promise<PublicUserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
    }));
  }

  async findById(id: string): Promise<PublicUserResponseDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
    };
  }

  async findByEmailForAuth(email: string): Promise<User | null> {
  return this.userRepository.findOne({
    where: { email },
  });
}

async findLibrary(id: string): Promise<LibraryResponseDto> {
  const user = await this.userRepository.findOne({
    where: { id },
    relations: {
      books: {
        owner: true,
      },
    },
  });

  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }

  return {
    id: user.id,
    username: user.username,
    books: user.books.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      fileUrl: book.fileUrl,
      coverImageUrl: book.coverImageUrl,
      owner: {
        id: user.id,
        username: user.username,
      },
    })),
  };
}

async findMe(id: string): Promise<UserResponseDto> {
  const user = await this.userRepository.findOne({
    where: { id },
  });

  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };
}

  //*Update Services
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

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
  //*Delete Services
  async remove(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      return false;
    }
    else {
      return true;
    }
  }
}