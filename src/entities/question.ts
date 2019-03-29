import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Answer } from './answer';
import { Test } from './test';

@Entity()
export class Question {
  @ManyToOne(type => Test, test => test.questions)
  public test: Test;

  @OneToMany(type => Answer, answer => answer.question)
  public answers: Answer[];

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public description: string;

  @Column()
  public imagePath: string;
}
