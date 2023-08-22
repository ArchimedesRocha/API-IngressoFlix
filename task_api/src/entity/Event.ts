import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
  export class Events {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    thumb: string;

    @Column()
    tag: string;

    @Column()
    event_date: Date;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    type: string;

    @Column({
      default : false
    })
    finished: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
  }
