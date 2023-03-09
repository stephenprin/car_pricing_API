import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserService } from '../../services/user/user.service';

@Controller('auth')
export class UserController {
    constructor(private userService: UserService) {}
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.userService.createUser(body.email, body.password);
    }
}
