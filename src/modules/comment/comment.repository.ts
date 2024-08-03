import { Repository } from "typeorm";
import { CommentEntity } from "./model/CommentEntity";
import { InjectRepository } from "@nestjs/typeorm";

export class CommentRepository extends Repository<CommentEntity>{

    constructor(
        @InjectRepository(CommentEntity)
        private commentRepository : Repository<CommentEntity>
    ){ super(
        commentRepository.target,
        commentRepository.manager,
        commentRepository.queryRunner,
    )}


    

}