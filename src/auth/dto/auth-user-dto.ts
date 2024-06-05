import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator"

export class AuthUserDto {
    
    @IsString()
    @IsNotEmpty()
    username: string
    
    @IsString()
    @IsNotEmpty()
    password: string
}