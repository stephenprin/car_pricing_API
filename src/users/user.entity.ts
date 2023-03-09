import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
   price: number;
}