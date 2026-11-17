import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength
} from 'class-validator';

export class LoginDto { 
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password!: string;
}
