import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    @IsIn(["monitor", "cajero", "administrador"])
    role: string
}