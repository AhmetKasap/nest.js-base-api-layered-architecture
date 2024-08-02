import { Repository } from 'typeorm';
import { PostEntity } from './model/PostEntity';
import { InjectRepository } from '@nestjs/typeorm';

export class PostRepository extends Repository<PostEntity> {

    constructor(
        @InjectRepository(PostEntity)
        private postRepostiory: Repository<PostEntity>
    ) {
        super(
            postRepostiory.target,
            postRepostiory.manager,
            postRepostiory.queryRunner,
        )
    }

    async getPostById(postId) : Promise<PostEntity> {
        const data = await this.findOne({
            where: { id: postId },
            relations: ['user'],
        })
        if(data) data.user = { id: data.user.id } as any
        return data


    }   

}
