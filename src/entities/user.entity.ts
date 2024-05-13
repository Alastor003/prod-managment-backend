import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'IdUser' })
  idUser: number;

  @Column({ length: 20, name: 'Name' })
  name: string;

  @Column({ unique: true, length: 50, name: 'Email' })
  email: string;

  @Column({ length: 50, name: 'Password' })
  password?: string;

  @Column({default: true, name: 'isActive'})
  isActive: boolean
}