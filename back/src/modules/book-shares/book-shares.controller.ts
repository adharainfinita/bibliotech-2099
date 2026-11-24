import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { BookSharesService } from './book-shares.service';
import { CreateBookShareDto } from './dto/create-book-share.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

type AuthenticatedRequest = Request & {
  user: {
    userId: string;
    email: string;
  };
};

@Controller('book-shares')
export class BookSharesController {
  constructor(
    private readonly bookSharesService: BookSharesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createBookShareDto: CreateBookShareDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.bookSharesService.create(
      createBookShareDto,
      request.user.userId,
    );
  }
}