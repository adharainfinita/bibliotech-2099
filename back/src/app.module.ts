import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', 
    port: 5432,
    username: 'your_username',
    password: 'your_password', 
    database: 'your_database',
    autoLoadEntities: true,
    synchronize: true,
  }), UsersModule, BooksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
