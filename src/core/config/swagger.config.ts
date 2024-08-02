import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Social-AI REST API')
    .setDescription('Users can register and share on the app. They can get support from artificial intelligence while sharing. They can read, comment, like and follow other users"posts".')
    .setVersion('1.0')
    .build();

