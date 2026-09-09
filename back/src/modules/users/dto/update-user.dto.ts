import {IsNotEmpty, MaxLength, MinLength, IsEmail } from 'class-validator';


export class UpdateUserDto {
  
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  username?: string;
  
  @IsEmail()
  @MaxLength(50)
  @IsNotEmpty()
  email?: string;
  
  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty()
  password?: string;
} 