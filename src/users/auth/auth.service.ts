import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../services/user/user.service";
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';


const scryptAsync = promisify(scrypt);

@Injectable()
export class AuthService { 
    constructor(private userService: UserService) { }
    
    async signupValidate(email: string, password: string) { 
        // Check if email is in use
        const user = await this.userService.findUsersEmail(email);
        if (user.length) {
            throw new BadRequestException('Email in use');
        }
    //hash password
    //generate salt
        const salt=randomBytes(8).toString('hex');
    //hash password + salt
        const hash = (await scryptAsync(password, salt, 32)) as Buffer;
        const result= salt + '.' + hash.toString('hex');
    //save salt and hash to db
        const newUser = await this.userService.create(email, result);
        
    }

    async signinValidate(email: string, password: string) { 
        const [user] = await this.userService.findUsersEmail(email);
        if (!user) { 
            throw new BadRequestException('Invalid email');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = await scryptAsync(password, salt, 32) as Buffer;
        if (storedHash !==hash.toString('hex')) { 
            throw new BadRequestException('Invalid password');
        }
        return user;
    }
}