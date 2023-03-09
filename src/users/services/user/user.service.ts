import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private repo:Repository<UserEntity> ) {
        
    }
    async createUser(email: string, password: string) { 
        const user = this.repo.create({ email, password });
        if (user) {
            return await this.repo.save(user);
        } else {
            throw new NotFoundException('User Input not found');     }
        
    }
}
