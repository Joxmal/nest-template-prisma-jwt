import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user-dto';


@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post()
    loginUser(@Body() authUserDto: AuthUserDto){
        return this.authService.loginUser(authUserDto)
    }
}
