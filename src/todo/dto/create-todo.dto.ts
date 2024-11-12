// src/todo/dto/create-todo.dto.ts
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ValidationMessages } from '../../common/validation-messages';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: ValidationMessages.name.required })
  @MinLength(3, { message: ValidationMessages.name.minLength })
  @MaxLength(10, { message: ValidationMessages.name.maxLength })
  name: string;

  @IsString()
  @IsNotEmpty({ message: ValidationMessages.description.required })
  @MinLength(10, { message: ValidationMessages.description.minLength })
  description: string;
}
