import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { APIException } from 'src/common/utils/ApiException';
import { PostRepository } from '../post/post.repostiory';
import { APIResponse } from 'src/common/utils/ApiResponse';

@Injectable()
export class LikeService {
    constructor(
        private readonly likeRepository : LikeRepository,
        private readonly postRepository : PostRepository
    ) {}


    async createOrDeleteLike(userId, postId) : Promise<any>{
        const post = await this.postRepository.findOne({where : {id : postId}})

        if(post===null) throw new APIException('post not found', 404)

        // Kullanıcının mevcut beğenisini kontrol et
        const existingLike = await this.likeRepository.findOne({
            where: {
                post: { id: postId },
                user: { id: userId },
            },
        })

        if (existingLike) { //beğeni varsa sil
            return await this.likeRepository.delete(existingLike.id)
        }
        else { //beğeni yoksa oluştur
            const newLike = this.likeRepository.create({
                user: { id: userId },
                post: { id: postId },
                count: 1, 
            });
            await this.likeRepository.save(newLike)
    
            return newLike
        }

    }


    async getLikeByPostId(postId) {
        const post = await this.postRepository.findOne({
            where : {id : postId}
        })

        if(post ===null) throw new APIException('post not found', 404)

        const likes = await this.likeRepository.find({
            where : {
                post : {id : postId}
            }
        })

        if(likes.length===0) throw new APIException('no like found for this post', 404)

        return likes.length


       
    }





}
