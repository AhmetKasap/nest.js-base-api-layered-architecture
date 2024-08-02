import { Body, Controller, Get, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { PostDTO } from './dto/PostDTO';
import { PostService } from './post.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UuidDTO } from 'src/common/dto/UuidDTO';
import { APIException } from 'src/common/utils/ApiException';
import { APIResponse } from 'src/common/utils/ApiResponse';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('post')
@Controller('post')
export class PostController {

    constructor(private readonly postService : PostService){}

    @UseGuards(AuthGuard)
    @Post()
    async createPost(@Body() postDTO : PostDTO, @Request() req) : Promise <any> {
        const user = await req.user
        return await this.postService.createPost(postDTO, user)
    }

    @UseGuards(AuthGuard)
    async deletePostById() {

    }

    async updatePost() {

    }

    @Get(':id')
    async getPostById (@Param() params: UuidDTO, @Res() res: Response) : Promise<any> {
        if(!params.id) throw new APIException('post not found', 404)

        const data = await this.postService.getPostById(params.id)
        if(data) return new APIResponse('post found', data).ok(res)

    }

    async getAllPostByUserId() {

    }   


    

}
