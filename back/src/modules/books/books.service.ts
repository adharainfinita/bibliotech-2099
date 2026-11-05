import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/books.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ){}

//*Create services
  async create(createBookDto: CreateBookDto): Promise<Book> {
   const owner = await this.bookRepository.findOne({ 
    where: { id: createBookDto.ownerId } 
  });
  if (!owner) {
    throw new NotFoundException(`Owner with id ${createBookDto.ownerId} not found`);
  }
  const book = this.bookRepository.create({
    title: createBookDto.title,
    author: createBookDto.author,
    genre: createBookDto.genre,
    description: createBookDto.description,
    fileUrl: createBookDto.fileUrl,
    coverImageUrl: createBookDto.coverImageUrl,
    // cuando implementemos autenticación, el propietario debería 
    // obtenerse del usuario autenticado, 
    // no confiar en un ownerId enviado libremente por el cliente.
    // Por ahora podemos utilizar ownerId para practicar la relación.
    owner,
  });
  return this.bookRepository.save(book);
  }

//*Read services
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findById(id: string): Promise<Book> {
    const book  = await this.bookRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  //*Update services
  async update(id: string, updateBookDto: Partial<CreateBookDto>): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  //*Delete services
  async remove(id: string): Promise<boolean> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return true;
  }
}
