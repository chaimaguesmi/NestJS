// src/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo/todo.service';
import { TodoEntity } from './entities/todo.entity/todo.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
