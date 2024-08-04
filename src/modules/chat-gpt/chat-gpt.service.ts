import { Injectable } from '@nestjs/common';
import { GptDTO } from './dto/GptDTO';
import OpenAI from "openai";
import 'dotenv/config'

@Injectable()
export class ChatGptService {
    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    async createSupport(gptDTO: GptDTO): Promise<any> {
        const completion = await this.openai.chat.completions.create({
            messages: [{ role: "system", content: gptDTO.content }],
            model: "gpt-4o-mini",
        })
        return completion
    }
}
