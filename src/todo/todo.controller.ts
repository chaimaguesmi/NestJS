// src/todo/todo.controller.ts
import { Body, Controller, Post, Patch, Param, Delete, Get, NotFoundException, Query } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }
  @Post('add')
  addTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.addTodo(createTodoDto.name, createTodoDto.description);
  }

  //@Patch(':id')
 // updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  //  return this.todoService.updateTodoStatus(+id, updateTodoDto.status);
 // }
  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(+id, updateTodoDto);
  }
   // Suppression douce d'un Todo
   @Delete(':id')
   async deleteTodo(
     @Param('id') id: string,
   ) {
     return this.todoService.deleteTodo(+id);  // Convertir id en number avec `+`
   }
 
   // Restaurer un Todo supprimé
   @Patch('restore/:id')
   async restoreTodo(
     @Param('id') id: string,
   ) {
     return this.todoService.restoreTodo(+id);  // Convertir id en number avec `+`
   }
   @Get('count')
   async countTodosByStatus() {
     return this.todoService.countTodosByStatus();
   }
   @Get()
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }
  // Endpoint pour récupérer les Todos en fonction des critères de recherche optionnels
  @Get('op')
  async getTodos(
    @Query('search') search?: string,  // Critère pour le nom ou la description
    @Query('status') status?: string   // Critère pour le statut
  ) {
    return await this.todoService.getTodos(search, status);
  }
  @Get(':id')
  async getTodoById(@Param('id') id: string) {
    const todo = await this.todoService.getTodoById(+id);
    
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return todo;
  }
}
