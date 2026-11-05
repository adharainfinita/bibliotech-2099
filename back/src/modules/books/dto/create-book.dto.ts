import { IsNotEmpty, IsOptional, IsString, MinLength, MaxLength, IsUUID } from 'class-validator';

export class CreateBookDto { 
  
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  author!: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  genre!: string;
  
  @IsOptional()
  @IsString()
  description?: string;
  
  @IsNotEmpty()
  @IsString()
  fileUrl!: string;
  
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsUUID()
  ownerId!: string;
}