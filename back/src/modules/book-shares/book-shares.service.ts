import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';

import { BookShare } from './entities/book-share.entity';
import { Book } from '../books/entities/books.entity';
import { User } from '../users/entities/users.entity';
import { CreateBookShareDto } from './dto/create-book-share.dto';

interface PostgresError {
  code: string;
}

@Injectable()
export class BookSharesService {
  constructor(
    @InjectRepository(BookShare)
    private readonly bookShareRepository: Repository<BookShare>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createBookShareDto: CreateBookShareDto,
    ownerId: string,
  ): Promise<BookShare> {
    const { bookId, recipientId } = createBookShareDto;

    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: { owner: true },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    if (book.owner.id !== ownerId) {
      throw new ForbiddenException('You are not the owner of this book');
    }

    if (recipientId === ownerId) {
      throw new BadRequestException('You cannot share a book with yourself');
    }

    const recipient = await this.userRepository.findOne({
      where: { id: recipientId },
    });

    if (!recipient) {
      throw new NotFoundException(`User with id ${recipientId} not found`);
    }

    const bookShare = this.bookShareRepository.create({
      book,
      recipient,
    });

    try {
      return await this.bookShareRepository.save(bookShare);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as PostgresError;

        if (driverError.code === '23505') {
          throw new ConflictException('This book is already shared with this user');
        }
      }

      throw error;
    }
  }
}