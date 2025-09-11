import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), 
    UsersModule, 
    BooksModule, 
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
