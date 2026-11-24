import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BookResponseDto } from './dto/book-response.dto';
import { User } from '../users/entities/users.entity';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //*Create services
  async create(createBookDto: CreateBookDto, ownerId: string): Promise<BookResponseDto> {
    const owner = await this.userRepository.findOne({
      where: { id: ownerId },
    });
    if (!owner) {
      throw new NotFoundException(
        `Owner with id ${ownerId} not found`,
      );
    }
    const book = this.bookRepository.create({
      title: createBookDto.title,
      author: createBookDto.author,
      genre: createBookDto.genre,
      description: createBookDto.description,
      fileUrl: createBookDto.fileUrl,
      coverImageUrl: createBookDto.coverImageUrl,
      owner,
    });
    const savedBook = await this.bookRepository.save(book);
    return this.toResponseDto(savedBook);
  }
  private toResponseDto(book: Book): BookResponseDto {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      fileUrl: book.fileUrl,
      coverImageUrl: book.coverImageUrl,
      owner: {
        id: book.owner.id,
        username: book.owner.username,
      },
    };
  }

  //*Read services
  async findAll(): Promise<BookResponseDto[]> {
    const books = this.bookRepository.find({
      relations: {
        owner: true,
      },
    });
    return (await books).map((book) => this.toResponseDto(book));
  }

  async findById(id: string): Promise<BookResponseDto> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: {
        owner: true,
      },
    });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return this.toResponseDto(book);
  }

  //*Update services
  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    ownerId: string
  ): Promise<BookResponseDto> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: {
        owner: true,
      },
    });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    if (book.owner.id !== ownerId) {
      throw new ForbiddenException(`You are not the owner of this book`);
    }
    Object.assign(book, updateBookDto);
    const updatedBook = await this.bookRepository.save(book);
    return this.toResponseDto(updatedBook);
  }

  //*Delete services
  async remove(id: string, ownerId: string): Promise<boolean> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: {
        owner: true,
      }, 
      });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    if (book.owner.id !== ownerId) {
      throw new ForbiddenException(`You are not the owner of this book`);
    }
    await this.bookRepository.remove(book);
    return true;
  }
}
