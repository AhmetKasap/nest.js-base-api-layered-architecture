import { Body, Controller,Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserDTO } from '../user/dto/UserDTO';
import { AuthService } from './auth.service';
import {LoginDTO} from './dto/LoginDTO'
import { AuthDTO } from './dto/AuthDTO';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('/register')
    async register(@Body() authDTO : AuthDTO): Promise<AuthDTO> {
        return await this.authService.register(authDTO)
    }   

    @Post('/login')
    async login (@Body() loginDTO : LoginDTO)  {
        const response = await this.authService.login(loginDTO)
        console.log(response)
    }

    @UseGuards(AuthGuard)
    @Get('/test-token')
    async testToken (@Request() req) {
        console.log(req.user)
        return req.user
    }



}
