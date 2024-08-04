import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentDTO } from './dto/CommentDTO';
import { APIException } from 'src/common/utils/ApiException';

@Injectable()
export class CommentService {

    constructor(private readonly commentRepository : CommentRepository){}

    async createComment(commentDTO : CommentDTO, userId) : Promise<any> {
        const comment = this.commentRepository.create({
            ...commentDTO,
            user : {id : userId}, 
            post : {id : commentDTO.postId} 
        })
        const savedComment = await this.commentRepository.save(comment)
        return savedComment.toDto()
    }

    async updateComment(commentId, updateCommentDTO, userId ) : Promise<any> {

        const comment = await this.commentRepository.find({
            where : {
                user : {id : userId},
                id : commentId
            }
        })

        if(!comment) throw new APIException('not found comment', 404)
        
        await this.commentRepository.update(commentId, {
            text : updateCommentDTO.text
        })

        return await this.commentRepository.findOne({
            where: {
                id: commentId,
                user: { id: userId },
            }
        }).then(comment => comment.toDto())

    }

    async deleteComment(commentId, userId) : Promise<any> {
        const comment = await this.commentRepository.find({
            where : {
                user : {id : userId},
                id : commentId
            }
        })
        if(!comment) throw new APIException('not found comment', 404)
        const deletedComment = await this.commentRepository.delete(commentId)
        return deletedComment

    }


    async getCommentAllByUserId(userId) : Promise<any> {
        const comments = await this.commentRepository.find({
            where: {user : {id : userId}},   
            relations: ['user']             
        })
        return comments.map(comment => comment.toDto())
    }

    async getCommentAllByPostId(postId) : Promise<any> {
        const comments = await this.commentRepository.find({
            where : {post : {id : postId}}
        })
        return comments.map(comment =>comment.toDto())
    }

}
