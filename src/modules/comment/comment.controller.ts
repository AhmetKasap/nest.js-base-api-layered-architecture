import { Body, Controller, Delete, Get, Param, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDTO } from './dto/CommentDTO';
import { AuthGuard } from '../auth/guard/auth.guard';
import { APIResponse } from 'src/common/utils/ApiResponse';
import { Response } from 'express';
import { CommentUpdateDTO } from './dto/CommentUpdateDTO';
import { APIException } from 'src/common/utils/ApiException';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('comments')
@Controller('comments')
export class CommentController {

    constructor(private readonly commentService : CommentService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createComment(@Body() commentDTO : CommentDTO, @Request() req , @Res() res:Response) : Promise<Response>{
        const userId = await req.user.id
   
        const data = await this.commentService.createComment(commentDTO, userId)
        if(data) return new APIResponse('comment created', data).created(res)

    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async updateComment(@Body() updateCommentDTO : CommentUpdateDTO  , @Param() params,  @Request() req, @Res() res:Response) : Promise<Response> {
        const commentId = await params.id
        const userId = await req.user.id

        const comment = await this.commentService.updateComment(commentId, updateCommentDTO, userId)
        if(comment) return new APIResponse('comment successfully updated', comment).ok(res)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteComment(@Param() params,  @Request() req, @Res() res:Response) : Promise<Response> {
        const userId = await req.user.id
        const commentId = await params.id

        const data = await this.commentService.deleteComment(commentId, userId)
        if(data.affected > 0) return new APIResponse('comment succesfully deleted', null).ok(res)
        else throw new APIException('comment not found', 404)

    }

    @UseGuards(AuthGuard)
    @Get()
    async getCommentAllByUserId(@Request() req, @Res() res:Response) : Promise<Response>{
        const userId = req.user.id

        const data = await this.commentService.getCommentAllByUserId(userId)

        if(data) return new APIResponse('comments found', data).ok(res)
        else return new APIResponse('comments not found', null).notfound(res)

    }

    @Get('/posts/:id')
    async getCommentAllByPostId(@Param() params, @Res() res:Response) : Promise<Response> {
        const postId = await params.id

        const data = await this.commentService.getCommentAllByPostId(postId)

        if(data) return new APIResponse('found comments on post', data).ok(res)
        else return new APIResponse("post's comments not found", null).notfound(res)

    }

}
