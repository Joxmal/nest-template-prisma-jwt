import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthUserDto } from './dto/auth-user-dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async loginUser(userObjectLogin: AuthUserDto){
        const findUser = await this.prisma.user.findUnique({
            where: {
                username: userObjectLogin.username
            }
        });

        if (!findUser) throw new HttpException('este usuario no existe', HttpStatus.FORBIDDEN)

        const checkPassword = await compare(userObjectLogin.password, findUser.password)

        if(!checkPassword) throw new HttpException('contraseña incorrecta', 403)

        const payload = { id: findUser.id, name:findUser.username}

        const token = this.jwtService.sign(payload)
        const data  = {
            user: findUser,
            token
        }

        return data

    } 

}
