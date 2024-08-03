import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {

    constructor(private readonly commentRepository : CommentRepository){}

    async createComment() {

    }

    async updateCommentById() {

    }

    async deleteCommentById() {

    }

    async getCommentById(){
        
    }

}
