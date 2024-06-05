import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { hash, compare } from 'bcrypt'; // encriptar
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService){}


    async getAllUsers(){
        return this.prisma.user.findMany()
    }

    async getOneUser(id: string){
        return this.prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        })
    }


    async createNewUser(userObject: CreateUserDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { username: userObject.username },
                    { email: userObject.email },
                ],
            },
        });
    
        if (existingUser) {
            throw new ConflictException('Ya existe este usuario');
        }

        const { password } = userObject;
        const hashedPassword = await hash(password, 10);

        userObject = {
            ...userObject,
            password:  hashedPassword,
        }
    
        return this.prisma.user.create({
            data: userObject,
        });
    }

}
