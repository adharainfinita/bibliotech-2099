import { BookResponseDto } from '../../books/dto/book-response.dto';

export class LibraryResponseDto {
  id!: string;
  username!: string;
  books!: BookResponseDto[];
}