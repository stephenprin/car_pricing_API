import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { AuthService } from './auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user-interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
   providers: [UserService, AuthService, 
  //   provide: APP_INTERCEPTOR,
  //   useClass: CurrentUserInterceptor
  ],
  controllers: [UserController]
})
export class UsersModule {}
