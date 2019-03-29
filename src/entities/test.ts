import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question';

@Entity()
export class Test {
  @OneToMany(type => Question, question => question.test)
  public questions: Question[];

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public publicTest: boolean;

  @Column()
  public subjectId: string;
}
