import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
  export class Events {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    imageURL: string;

    @Column()
    tag: string;

    @Column()
    event_date_day: string;

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
