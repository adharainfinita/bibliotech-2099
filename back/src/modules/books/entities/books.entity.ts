import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../users/entities/users.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({nullable: true})
    description: string;

    @Column()
    fileUrl: string; // Ruta en S3 o Cloudinary

    @ManyToOne(() => User, (user) => user.books)
    owner: User;
}