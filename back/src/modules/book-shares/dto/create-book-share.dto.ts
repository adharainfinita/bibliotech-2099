import { IsUUID } from 'class-validator';

export class CreateBookShareDto {
  @IsUUID()
  bookId!: string;

  @IsUUID()
  recipientId!: string;
}
