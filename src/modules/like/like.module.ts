import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './model/LikeEntity';
import { LikeRepository } from './like.repository';
import { PostEntity } from '../post/model/PostEntity';
import { PostRepository } from '../post/post.repostiory';

@Module({
  imports : [
    TypeOrmModule.forFeature([LikeEntity, PostEntity])
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, PostRepository]
})
export class LikeModule {}
