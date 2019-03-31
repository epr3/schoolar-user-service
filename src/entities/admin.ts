import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public userId: string;
}
