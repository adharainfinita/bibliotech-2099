import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title!: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  author!: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  genre!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description!: string | null;

  @Column({
    name: 'file_url',
    type: 'text',
  })
  fileUrl!: string; // Ruta en S3 o Cloudinary

  @Column({
    name: 'cover_image_url',
    type: 'text',
    nullable: true,
  })
  coverImageUrl!: string | null; // Ruta en S3 o Cloudinary

  @ManyToOne(() => User, (user) => user.books, {
    nullable: false
  })
  @JoinColumn({ name: 'owner_id' })
  owner!: User;
}
