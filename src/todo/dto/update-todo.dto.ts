// src/todo/dto/update-todo.dto.ts
import { IsString, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { ValidationMessages } from '../../common/validation-messages';
import { StatusEnum } from 'src/status.enum';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  @MinLength(3, { message: ValidationMessages.name.minLength })
  @MaxLength(10, { message: ValidationMessages.name.maxLength })
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(10, { message: ValidationMessages.description.minLength })
  description?: string;

  @IsEnum(StatusEnum, { message: ValidationMessages.status.invalid })
  @IsOptional()
  status?: StatusEnum;
}
