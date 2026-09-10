import { Controller, Post } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  //*Create services
  
  @Post(':id')
  async create(){

  }

}
