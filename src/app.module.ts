import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/entities/todo.entity/todo.entity';
import { TodoService } from './todo/todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [CommonModule, TestModule,
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root', 
      password: '', 
      database: 'tp1finale', 
      autoLoadEntities: true, 
      synchronize: true, 
      logging: true,
    }),
    TypeOrmModule.forFeature([TodoEntity]),
    TodoModule // pour importer les entités dans le module

  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],

})
export class AppModule {}
