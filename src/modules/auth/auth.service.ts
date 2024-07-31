import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/model/UserEntity';
import { Repository } from 'typeorm';
import { UserDTO } from '../user/DTO/UserDTO';
import { ErrorException } from 'src/core/utils/ErrorException';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserEntity)
        private readonly authRepository : Repository<UserEntity>
    ){}

    async register(userDTO : UserDTO) : Promise<UserEntity> {
        const existingUser = await this.authRepository.findOne({where : {email : userDTO.email}})
        if (existingUser) throw new ErrorException('User with this email already exists', 409)

        const auth = this.authRepository.create(userDTO)
        await this.authRepository.save(auth)
        return auth
    }

}