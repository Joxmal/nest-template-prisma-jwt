import { Controller,Post,Body, Get, Param,UseGuards } from '@nestjs/common';
import {UsersService} from './users.service'
import { CreateUserDto } from './dto/create-user-dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}


    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    getUserById(@Param('id') id:string){
        return this.usersService.getOneUser(id)
    }

    @Post()
    createNewUser(@Body() user:CreateUserDto ){
        return this.usersService.createNewUser(user)
    }
}
