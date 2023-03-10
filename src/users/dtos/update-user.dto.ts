import { IsEmail, IsOptional, IsString } from "class-validator";


export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}