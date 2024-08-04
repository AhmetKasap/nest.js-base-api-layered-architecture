import { Injectable, Logger } from '@nestjs/common';
import { PostEntity } from './model/PostEntity';
import { PostDTO } from './dto/PostDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostRepository } from './post.repostiory';
import { UuidDTO } from 'src/common/dto/UuidDTO';
import { APIException } from 'src/common/utils/ApiException';

@Injectable()
export class PostService {
    //private logger = new Logger(PostService.name)
    constructor(
       private readonly postRepository : PostRepository
    ){}


    async createPost(userId, postDTO : PostDTO) : Promise<PostEntity> {
        const post = this.postRepository.create({...postDTO, user: userId })
        await this.postRepository.save(post)
        return post
    }

    async deletePost(userId, postId ) : Promise<any> {
        const deleted = await this.postRepository.delete({
            id: postId,
            user: { id: userId }
        })
        if(deleted.affected>0) return deleted
        else throw new APIException('an error occurred during the deletion process', 500)
    }

    async updatePost(userId, postId,  postDTO : PostDTO) : Promise<any> {

        const validate = await this.postRepository.findOne({
            where: {
                id: postId,
                user: { id: userId } 
            },
        })
        console.log(validate)

        if(validate===null) throw new APIException('post not found or you are not authorized to update', 404)

        const updated = await this.postRepository.update(postId,{
            title : postDTO.title,
            content : postDTO.content
        })

        if(updated.affected <=0) throw new APIException('an error occurred during the update', 500)
        
        const updatedResult = await this.postRepository.findOne({where : {id : postId}})
        return updatedResult.toDto()
        

    }

    async getAllPostByUserId(userId) : Promise<any> {
        const posts = await this.postRepository.find({
            where : {user : {id : userId}}
        })
        if(posts.length ===0) throw new APIException('post not found', 404)
        return posts.map(post => post.toDto())
    }

    async getPostById(postId) : Promise<any> {
        const post = await this.postRepository.findOne({
            where : {id : postId}
        })
        return post.toDto()

    }

    



}
