
export class BookResponseDto {
  id!: string; 
  title!: string;
  author!: string;
  genre!: string;
  description!: string | null;
  fileUrl!: string;
  coverImageUrl!: string | null;
  owner!: {
    id: string;
    username: string;
  };
}