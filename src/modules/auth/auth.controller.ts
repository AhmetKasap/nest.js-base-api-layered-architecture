import { Body, Controller,Get, Post } from '@nestjs/common';
import { UserDTO } from '../user/dto/UserDTO';
import { AuthService } from './auth.service';
import {LoginDTO} from './dto/LoginDTO'
import { AuthDTO } from './dto/AuthDTO';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('/register')
    async register(@Body() authDTO : AuthDTO): Promise<AuthDTO> {
        return await this.authService.register(authDTO)
    }   

    @Post('/login')
    async login (@Body() loginDTO : LoginDTO) : Promise<LoginDTO> {
        return await this.authService.login(loginDTO)
    }
}
