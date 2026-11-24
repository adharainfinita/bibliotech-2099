import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';

import { Book } from '../../books/entities/books.entity';
import { User } from '../../users/entities/users.entity';

@Entity('book_shares')
@Unique('UQ_book_share_recipient', ['book', 'recipient'])
export class BookShare {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Book, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book!: Book;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipient_id' })
  recipient!: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}