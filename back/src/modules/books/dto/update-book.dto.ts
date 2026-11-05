import { IsNotEmpty, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateBookDto { 

  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  author?: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  genre?: string;
  
  @IsOptional()
  @IsString()
  description?: string;
  
  @IsOptional()
  fileUrl?: string;
  
  @IsOptional()
  @IsString()
  coverImageUrl?: string;
}