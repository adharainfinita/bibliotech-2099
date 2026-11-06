import {IsOptional, MaxLength, MinLength, IsEmail } from 'class-validator';


export class UpdateUserDto {
  
  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  username?: string;
  
  @IsEmail()
  @MaxLength(50)
  @IsOptional()
  email?: string;
  
  @MinLength(6)
  @MaxLength(100)
  @IsOptional()
  password?: string;
} 