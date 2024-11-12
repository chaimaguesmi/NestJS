import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity/todo.entity';
import { StatusEnum } from 'src/status.enum';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const { name, description } = createTodoDto;
    const todo = this.todoRepository.create({ name, description });
    return this.todoRepository.save(todo);
  }


  async updateTodoStatus(id: number, status: StatusEnum): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.status = status;
    return this.todoRepository.save(todo);
  }
  async addTodo(name: string, description: string): Promise<TodoEntity> {
    const todo = this.todoRepository.create({
      name,
      description,
      status: StatusEnum.PENDING,  // Par défaut, statut est PENDING
    });
    return this.todoRepository.save(todo);
  }
  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneBy({ id });
    
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    // Mise à jour des propriétés (si elles existent dans DTO)
    if (updateTodoDto.name) {
      todo.name = updateTodoDto.name;
    }
    if (updateTodoDto.description) {
      todo.description = updateTodoDto.description;
    }
    if (updateTodoDto.status) {
      todo.status = updateTodoDto.status;
    }
    
    todo.updatedAt = new Date();  // Mettre à jour le champ updatedAt

    return this.todoRepository.save(todo);  // Sauvegarde dans la base de données
  }
   // Méthode pour effectuer une suppression douce
   async deleteTodo(id: number): Promise<void> {
    const result = await this.todoRepository.softDelete(id); // Suppression douce

    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }

  // Méthode pour restaurer un Todo supprimé
  async restoreTodo(id: number): Promise<void> {
    const result = await this.todoRepository.restore(id);  // Restaurer la suppression douce

    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
  // Pour obtenir seulement les Todos non supprimés
async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
  async getTodos(search?: string, status?: string): Promise<TodoEntity[]> {
    const whereConditions: any = {};

    if (search) {
      // Utilisation de l'opérateur LIKE pour la recherche dans le nom ou la description
      whereConditions.name = Like(`%${search}%`);
      whereConditions.description = Like(`%${search}%`);
    }

    if (status) {
      whereConditions.status = status;
    }

    return this.todoRepository.find({ where: whereConditions });
  }
  // Pour obtenir tous les Todos, y compris ceux supprimés
  async getAllTodosWithDeleted(): Promise<TodoEntity[]> {
    return this.todoRepository.find({ withDeleted: true });
  }
  async countTodosByStatus(): Promise<{ [key in StatusEnum]: number }> {
    const todoCount = await this.todoRepository.count({ where: { status: StatusEnum.PENDING } });
    const inProgressCount = await this.todoRepository.count({ where: { status: StatusEnum.IN_PROGRESS } });
    const doneCount = await this.todoRepository.count({ where: { status: StatusEnum.DONE } });

    return {
      [StatusEnum.PENDING]: todoCount,
      [StatusEnum.IN_PROGRESS]: inProgressCount,
      [StatusEnum.DONE]: doneCount,
    };
  }
  // Méthode pour récupérer un Todo par ID
  async getTodoById(id: number): Promise<TodoEntity | null> {
    return await this.todoRepository.findOneBy({ id });
  }
}
