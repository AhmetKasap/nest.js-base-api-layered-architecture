import { Repository } from "typeorm";
import { LikeEntity } from "./model/LikeEntity";
import { InjectRepository } from "@nestjs/typeorm";

export class LikeRepository extends Repository<LikeEntity> {
    constructor(
        @InjectRepository(LikeEntity)
        private readonly likeRepository : Repository<LikeEntity>
    ){
        super(
            likeRepository.target,
            likeRepository.manager,
            likeRepository.queryRunner,
        )
    }
}