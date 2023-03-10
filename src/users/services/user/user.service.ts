import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private repo:Repository<UserEntity> ) {}
    async create(email: string, password: string) { 
        const user = this.repo.create({ email, password });
        if (user) {
            return await this.repo.save(user);
        } else {
            throw new NotFoundException('User Input not found');
        }
        
    }
    async findUser(id: number) { 
        return this.repo.findOneBy({id:id});
    }
    async findUsersEmail(email:string) {
        return this.repo.find({
            where: {
              email: email,
            },
          });
    }
    async updateUser(id: number, attrs: Partial<UserEntity>) { 
        const user = await this.findUser(id);
        !user && new NotFoundException('User not found');
        Object.assign(user, attrs);
        return await this.repo.save(user);

    }
    async removeUser(id: number) { 
        const user = await this.findUser(id);
        !user && new NotFoundException('User not found');
        return await this.repo.remove(user);
    }
    async findAllUser() { 
        return await this.repo.find();
    }

}
