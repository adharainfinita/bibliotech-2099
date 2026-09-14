import { IsNotEmpty, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateBookDto { 
  
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  title!: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  author!: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  genre!: string;
  
  @IsOptional()
  @IsString()
  description?: string;
  
  @IsNotEmpty()
  fileUrl!: string;
  
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsNotEmpty()
  ownerId!: string;
}