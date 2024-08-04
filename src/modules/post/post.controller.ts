import { Body, Controller, Delete, Get, Param, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { PostDTO } from './dto/PostDTO';
import { PostService } from './post.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UuidDTO } from 'src/common/dto/UuidDTO';
import { APIException } from 'src/common/utils/ApiException';
import { APIResponse } from 'src/common/utils/ApiResponse';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {

    constructor(private readonly postService : PostService){}

    @UseGuards(AuthGuard)
    @Post()
    async createPost(@Body() postDTO : PostDTO, @Request() req) : Promise <any> {
        const userId = await req.user.id
        return await this.postService.createPost(userId, postDTO)
    }


    @UseGuards(AuthGuard)
    @Delete(':id')
    async deletePost(@Param() params : UuidDTO, @Request() req , @Res() res:Response) : Promise<Response> {
        console.log("asd")
        const userId = await req.user.id
        const postId = await params.id

        const data = await this.postService.deletePost(userId,postId)
        if(data) return new APIResponse('post successfully deleted', null).ok(res)
    }   

    
    @UseGuards(AuthGuard)
    @Put(':id')
    async updatePost(@Body() postDTO : PostDTO, @Param() params : UuidDTO, @Request() req, @Res() res:Response) : Promise<Response> {
        const userId = await req.user.id
        const postId = await params.id

        const data = await this.postService.updatePost(userId, postId, postDTO )
        if(data) return new APIResponse('post successfully updated', data).ok(res)
    }   

    @UseGuards(AuthGuard)
    @Get('/users')
    async getAllPostByUserId(@Request() req, @Res() res:Response) : Promise<Response>{    
        const userId = await req.user.id

        const posts = await this.postService.getAllPostByUserId(userId)
        return new APIResponse('post found', posts).ok(res)
    }   

    @Get(':id')
    async getPostById (@Param() params, @Res() res: Response) : Promise<Response> { 
        const postId = await params.id
        if(!postId) throw new APIException('post not found', 404)

        const data = await this.postService.getPostById(postId)
        if(data) return new APIResponse('post found', data).ok(res)
    }

   


    

}
