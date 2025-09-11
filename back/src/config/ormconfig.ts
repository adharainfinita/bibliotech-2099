import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/users.entity";
import { Book } from "src/modules/books/entities/books.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT ?? "5432", 10),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "bibliotech",
  entities: [User, Book],
  synchronize: true, // Set to false in production
};
