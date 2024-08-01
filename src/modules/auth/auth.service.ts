import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/model/UserEntity';
import { Repository } from 'typeorm';
import { UserDTO } from '../user/dto/UserDTO';
import { ErrorException } from 'src/core/utils/ErrorException';
import { LoginDTO } from './dto/LoginDTO';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly authRepository: Repository<UserEntity>
    ) { }

    async register(userDTO: UserDTO): Promise<UserEntity> {
        const existingUser = await this.authRepository.findOne({ where: { email: userDTO.email } })
        if (existingUser) throw new ErrorException('User with this email already exists', 409)

        const hashedPassword = await bcrypt.hash(userDTO.password, 10); // 10, saltRounds değeridir
        const user = this.authRepository.create({
            ...userDTO,
            password: hashedPassword,
        });
        await this.authRepository.save(user);
        return user;

    }

    async login(loginDTO: LoginDTO): Promise<UserEntity> {
        const auth = await this.authRepository.findOne({ where: { email: loginDTO.email} })
        if(!auth) throw new ErrorException('Invalid email or password',401) 
        
        const isPasswordValid = await bcrypt.compare(loginDTO.password, auth.password)
        if(!isPasswordValid) throw new ErrorException('Invalid email or password',401) 

        return auth
    }

}