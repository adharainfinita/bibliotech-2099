import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookShare } from './entities/book-share.entity';
import { BookSharesService } from './book-shares.service';
import { BookSharesController } from './book-shares.controller';
import { Book } from '../books/entities/books.entity';
import { User } from '../users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookShare, Book, User]),
  ],
  controllers: [BookSharesController],
  providers: [BookSharesService],
})
export class BookSharesModule {}