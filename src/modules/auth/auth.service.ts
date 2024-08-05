import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/model/UserEntity';
import { Repository } from 'typeorm';
import { UserDTO } from '../user/dto/UserDTO';
import { LoginDTO } from './dto/LoginDTO';
import { AuthDTO } from './dto/AuthDTO';
import { JwtService } from '@nestjs/jwt';
import { APIException } from 'src/common/utils/ApiException';


@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,

        @InjectRepository(UserEntity)
        private readonly authRepository: Repository<UserEntity>
    ) { }

    async register(authDTO: AuthDTO): Promise<UserEntity> {
        const existingUser = await this.authRepository.findOne({ where: { email: authDTO.email } })
        if (existingUser) throw new APIException('User with this email already exists', 409)

        const user = this.authRepository.create({
            ...authDTO,
            password: authDTO.password,
        });
        await this.authRepository.save(user)
        return user
    }

    async login(loginDTO: LoginDTO) {
        const auth = await this.authRepository.findOne({ where: { email: loginDTO.email } })
        if (!auth) throw new APIException('Invalid email or password', 401)

   
        const payload = { id: auth.id, email: auth.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }

    }



}