import { Body, Controller,Get, Post, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserDTO } from '../user/dto/UserDTO';
import { AuthService } from './auth.service';
import {LoginDTO} from './dto/LoginDTO'
import { AuthDTO } from './dto/AuthDTO';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthGuard } from './guard/auth.guard';
import { APIResponse } from 'src/common/utils/ApiResponse';
import { Response } from 'express';
import { ResponseInterceptor } from 'src/core/interceptors/ResponseInterceptor';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @SkipThrottle()
    @Post('/register')
    async register(@Body() authDTO : AuthDTO, @Res() res: Response): Promise<Response> {
        const data = await this.authService.register(authDTO)
        if (data) return new APIResponse("registration created successfully", data).ok(res)
    }   

    @UseInterceptors(ResponseInterceptor)
    @Post('/login')
    async login (@Body() loginDTO : LoginDTO, @Res() res: Response) : Promise<any>  {
        const token = await this.authService.login(loginDTO)
        if (token) return new APIResponse('login successfully', token).ok(res)
    }

    @UseGuards(AuthGuard)
    @Get('/test-token')
    async testToken (@Request() req) {
        console.log(req.user)
        return req.user
    }



}
