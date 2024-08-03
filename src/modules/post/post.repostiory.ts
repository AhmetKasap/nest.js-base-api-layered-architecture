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

  

    async deletePostById (user,postId) : Promise<any> {
        const data = await this.createQueryBuilder()
                    .delete()
                    .from(PostEntity)
                    .where('id = :postId AND userId = :userId', { postId, userId : user.id })
                    .execute()
        return data
    }

    async updatePostById (user, postId, postDTO) : Promise<any> {
        const data = await this.createQueryBuilder()
                        .update(PostEntity)
                        .set({
                            title : postDTO.title,
                            content : postDTO.content
                        }) 
                        .where('id = :postId AND userId = :userId', { postId, userId : user.id })
                        .execute()
        return data
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
