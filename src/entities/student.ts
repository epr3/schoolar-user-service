import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public surname: string;

  @Column()
  public telephone: string;

  @Column({ nullable: true })
  public groupId: string;

  @Column()
  public userId: string;
}
