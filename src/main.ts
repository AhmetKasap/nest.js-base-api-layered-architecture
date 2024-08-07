import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import {swaggerConfig} from './core/config/swagger.config'
import { corsSettings } from './core/config/cors/cors.settings'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix(`${process.env.NAME}/${process.env.VERSION}`)

  //!validation
  app.useGlobalPipes(new ValidationPipe())

  //!swagger config
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('swagger-docs', app, document)

  //!cors settings
  //app.enableCors(corsSettings)

  await app.listen(process.env.PORT || 5001)
  
}
bootstrap()


