import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session} from '@nestjs/common';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../auth/auth.service'



@Controller('auth')
@Serialize(UserDto)
export class UserController {
    constructor(
        private userService: UserService,
        private userAuth: AuthService
    ) { }

    @Get('/who')
    whoami(@Session() session:any) {
        return this.userService.findUser(session.userId)
     }   
        
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.userAuth.signupValidate(body.email, body.password);
        session.userId = user.id;
        return user;
        
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) { 
        const user = await this.userAuth.signinValidate(body.email, body.password)
        session.userId = user.id;
        return user;
    }
   
   
    @Get("/user/:id")
    async findUser(@Param('id') id: string) {
     ;
        const user = this.userService.findUser(parseInt(id));
        if (!user) {
            throw new NotFoundException('User not found');
        } else {
            return user;
        }
    }
    @Get("/users")
    findAllUsers(@Query('email') email: string) {
        return this.userService.findUsersEmail(email);
    }
    @Delete("/user/:id")
    removeUser(@Param('id') id: string) { 
        return this.userService.removeUser(parseInt(id));
    }
    @Patch("/user/:id")
    updateUser(@Param('id') id: string, @Body() body:UpdateUserDto ) { 
        return this.userService.updateUser(parseInt(id), body);

    }
    @Get("/users")
    findAllUser() { 
        return this.userService.findAllUser();
    }
    
}
