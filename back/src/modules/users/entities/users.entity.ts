import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { Book } from "../../books/entities/books.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ 
        type: 'varchar',
        length: 30,
        unique: true 
    })
    username!: string;

    @Column({
        type: 'varchar',
        length: 50, 
        unique: true 
    })
    email!: string;

    @Column({ 
        type: 'varchar',
    })
    passwordHash!: string;

   @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Book, (book) => book.owner)
    books!: Book[];
}



