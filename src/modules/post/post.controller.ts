import { Body, Controller, Delete, Get, Param, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
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
    @Delete(':id')
    async deletePostById(@Param() params : UuidDTO, @Request() req, @Res() res:Response) : Promise<Response> {
        console.log("asd")
        const user = await req.user
        const postId = await params.id

        const data = await this.postService.deletePostById(user,postId)
        if(data.affected ===0) return new APIResponse('not found post', null).notfound(res)

        if(data) return new APIResponse('post successfully deleted', null).ok(res)
    }   

    
    @UseGuards(AuthGuard)
    @Put(':id')
    async updatePostById(@Body() postDTO : PostDTO, @Param() params : UuidDTO, @Request() req, @Res() res:Response) : Promise<Response> {
        const user = await req.user
        const postId = await params.id

        const data = await this.postService.updatePostById(user, postId, postDTO )
        if(data.affected ===0) return new APIResponse('not found post', null).notfound(res)
        if(data) return new APIResponse('post successfully updated', null).ok(res)
    }   


    @Get(':id')
    async getPostById (@Param() params: UuidDTO, @Res() res: Response) : Promise<any> {
        if(!params.id) throw new APIException('post not found', 404)

        const data = await this.postService.getPostById(params.id)
        if(data) return new APIResponse('post found', data).ok(res)
    }


    async getAllPostByUserId() {}   


    

}
