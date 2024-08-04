import { Repository } from "typeorm";
import { UserEntity } from "./model/UserEntity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository extends Repository <UserEntity>{

    constructor (
        @InjectRepository(UserEntity)
        private userRepository : Repository<UserEntity>
    ){
        super(
            userRepository.target,
            userRepository.manager,
            userRepository.queryRunner,
        )
    }

}