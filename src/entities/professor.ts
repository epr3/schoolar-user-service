import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public surname: string;

  @Column()
  public title: string;

  @Column()
  public telephone: string;

  @Column({ unique: true })
  public userId: string;
}
