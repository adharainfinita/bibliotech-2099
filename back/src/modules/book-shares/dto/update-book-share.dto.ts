import { PartialType } from '@nestjs/mapped-types';
import { CreateBookShareDto } from './create-book-share.dto';

export class UpdateBookShareDto extends PartialType(CreateBookShareDto) {}
