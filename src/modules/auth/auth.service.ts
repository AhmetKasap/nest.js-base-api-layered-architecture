import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/model/UserEntity';
import { Repository } from 'typeorm';
import { UserDTO } from '../user/dto/UserDTO';
import { ErrorException } from 'src/common/utils/ErrorException';
import { LoginDTO } from './dto/LoginDTO';
import * as bcrypt from 'bcrypt';
import { AuthDTO } from './dto/AuthDTO';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,

        @InjectRepository(UserEntity)
        private readonly authRepository: Repository<UserEntity>


    ) { }

    async register(authDTO: AuthDTO): Promise<UserEntity> {
        const existingUser = await this.authRepository.findOne({ where: { email: authDTO.email } })
        if (existingUser) throw new ErrorException('User with this email already exists', 409)

        const hashedPassword = await bcrypt.hash(authDTO.password, 10); // 10, saltRounds değeridir
        const user = this.authRepository.create({
            ...authDTO,
            password: hashedPassword,
        });
        await this.authRepository.save(user);
        return user;
    }

    async login(loginDTO: LoginDTO) {
        const auth = await this.authRepository.findOne({ where: { email: loginDTO.email } })
        if (!auth) throw new ErrorException('Invalid email or password', 401)

        const isPasswordValid = await bcrypt.compare(loginDTO.password, auth.password)
        if (!isPasswordValid) throw new ErrorException('Invalid email or password', 401)

        const payload = { id: auth.id, email: auth.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }

    }



}