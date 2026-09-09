import {IsNotEmpty, MaxLength, MinLength, IsEmail } from 'class-validator';



export class CreateUserDto {

  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  username!: string;
  
  
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email!: string;
  
  
  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty()
  password!: string;
}