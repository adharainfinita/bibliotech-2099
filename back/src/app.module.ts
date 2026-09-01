import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './config/ormconfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }), 
  
  TypeOrmModule.forRootAsync(typeOrmConfig), 
    UsersModule, 
    BooksModule, 
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
