import { Body, Controller,Get, Post } from '@nestjs/common';
import { UserDTO } from '../user/DTO/UserDTO';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('/register')
    async register(@Body() userDTO : UserDTO): Promise<UserDTO> {
        return await this.authService.register(userDTO)
    }   
}
