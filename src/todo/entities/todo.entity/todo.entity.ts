
import { StatusEnum } from "src/status.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "../base.entity";

@Entity('todos')
export class TodoEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number; 
  
    @Column({ length: 255 })
    name: string; 
  
    @Column({ type: 'text', nullable: true })
    description: string; // Description du todo
   
    @Column({
      type: 'enum',
      enum: StatusEnum,
      default: StatusEnum.PENDING, // Valeur par défaut
    })
    status: StatusEnum; // Statut du todo
}
