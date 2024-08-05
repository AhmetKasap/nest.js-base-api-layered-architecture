import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserUpdateDTO } from './dto/UserUpdateDTO';
import { PasswordDTO } from './dto/PasswordDTO';

@Injectable()
export class UserService {
    
    constructor(private readonly userRepository : UserRepository){}

    async updateUser (userId, userUpdateDto : UserUpdateDTO) : Promise<any> {
        await this.userRepository.update(userId, userUpdateDto)

        const returnUpdate = await this.userRepository.findOne({
            where : {id : userId}
        })
        
        return returnUpdate.toDto()
    }

    async updatePassword (userId, passwrodDto : PasswordDTO) : Promise<any> {

        return await this.userRepository.update(userId, {password : passwrodDto.password})
    }

    async deleteUser(userId) : Promise<any> {
        const deleted = await this.userRepository.delete(userId)
        return deleted
    }


}
