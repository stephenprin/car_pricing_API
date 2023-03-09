import { Entity, PrimaryGeneratedColumn, Column, AfterInsert, AfterUpdate, AfterRemove} from "typeorm";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    password: string;


    @AfterInsert()
    logInsert() { 
        console.log('Inserted User with id: ', this.id);
    }
    @AfterUpdate()
    logUpdate() { 
        console.log('Updated User with id: ', this.id);
    }
    @AfterRemove()
    logRemove() { 
        console.log('Removed User with id: ', this.id);
    }
}