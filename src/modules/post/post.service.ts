import { Injectable, Logger } from '@nestjs/common';
import { PostEntity } from './model/PostEntity';
import { PostDTO } from './dto/PostDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostRepository } from './post.repostiory';

@Injectable()
export class PostService {
    //private logger = new Logger(PostService.name)
    constructor(
       private readonly postRepository : PostRepository
    ){}


    async createPost(postDTO : PostDTO, user) : Promise<PostEntity> {
        const post = this.postRepository.create({...postDTO, user: user.id })
        await this.postRepository.save(post)
        return post
    }

    async getPostById(postId) {
        const post = await this.postRepository.getPostById(postId)
        return post
    }

    

}
