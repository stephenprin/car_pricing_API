import { NestInterceptor, ExecutionContext, Injectable, CallHandler } from "@nestjs/common";
import { UserService } from "../services/user/user.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService:UserService) {}
    intercept(context: ExecutionContext, next: CallHandler) { 
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};
        if(!userId) { 
            return next.handle();
        }
        const user = this.userService.findUser(userId);
         request.currentUser = user;

    }
 }