import { Body, Controller,Get, Post } from '@nestjs/common';
import { UserDTO } from '../user/dto/UserDTO';
import { AuthService } from './auth.service';
import {LoginDTO} from './dto/LoginDTO'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('/register')
    async register(@Body() userDTO : UserDTO): Promise<UserDTO> {
        return await this.authService.register(userDTO)
    }   

    @Post('/login')
    async login (@Body() loginDTO : LoginDTO) : Promise<LoginDTO> {
        return await this.authService.login(loginDTO)
    }
}
