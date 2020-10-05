import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.age = 0;
    this.address = '';
  }

  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  address: string;
}
