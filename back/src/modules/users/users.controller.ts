import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {  
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  async findById(@Body('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get(':username')
  async findByUsername(@Body('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get(':email')
  async findByEmail(@Body('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
