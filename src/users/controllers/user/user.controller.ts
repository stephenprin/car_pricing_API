import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query ,UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
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
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.userAuth.signupValidate(body.email, body.password);
        
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
