import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
}