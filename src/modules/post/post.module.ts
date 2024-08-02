import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './model/PostEntity';
import { PostRepository } from './post.repostiory';

@Module({
  imports : [
    TypeOrmModule.forFeature([PostEntity])
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository]
})
export class PostModule {}
