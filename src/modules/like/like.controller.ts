import { Body, Controller, Delete, Get, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { LikeDTO } from './dto/LikeDTO';
import { Response } from 'express';
import { APIResponse } from 'src/common/utils/ApiResponse';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
    
    constructor(private readonly likeService : LikeService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createOrDeleteLike(@Body() likeDTO : LikeDTO, @Request() req, @Res() res:Response) : Promise<Response> {
        const userId = await req.user.id
        const postId = await likeDTO.postId

        const result = await this.likeService.createOrDeleteLike(userId, postId)

        if('affected' in result) {
            if(result.affected===1) return new APIResponse('likes deleted', null).ok(res)
        }
        else return new APIResponse('likes created', null).ok(res)
        
    }

   
    @Get('/posts/:id')
    async getLikeByPostId(@Param() params, @Res() res:Response) : Promise<Response> {
        const postId = await params.id
        
        const data = await this.likeService.getLikeByPostId(postId)
        if(data) return new APIResponse('total like', data).ok(res)

    }
}
