import { Body, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { GptDTO } from './dto/GptDTO';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Response } from 'express';
import { APIResponse } from 'src/common/utils/ApiResponse';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chat-gpt')
@Controller('chat-gpt')
export class ChatGptController {

    constructor(private readonly gptService : ChatGptService){}

    @Post()
    @UseGuards(AuthGuard)
    async createSupport(@Body() gptDTO : GptDTO, @Res() res:Response) : Promise<any>{
        
        const data = await this.gptService.createSupport(gptDTO)
        return new APIResponse('message returned from ai', data).ok(res)

    }
}
