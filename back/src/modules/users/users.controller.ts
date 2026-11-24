import { Body, Controller, Delete, Get, Patch, Post, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';

type AuthenticatedRequest = Request & {
  user: {
    userId: string;
    email: string;
  };
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id/library')
async findLibrary(@Param('id', new ParseUUIDPipe()) id: string) {
  return this.usersService.findLibrary(id);
  }
  
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findMe(@Req() request: AuthenticatedRequest) {
    return this.usersService.findMe(request.user.userId);
  }
  
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findById(id);
  }


  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    if (req.user.userId !== id) {
      throw new ForbiddenException('No tienes permiso para actualizar este usuario');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string, 
    @Req() req: AuthenticatedRequest,
) {
    if (req.user.userId !== id) {
      throw new ForbiddenException('No tienes permiso para eliminar este usuario');
    }
    return this.usersService.remove(id);
  }
}
