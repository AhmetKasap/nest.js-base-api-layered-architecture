import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './model/CommentEntity';
import { UserEntity } from '../user/model/UserEntity';
import { PostEntity } from '../post/model/PostEntity';

@Module({
  imports : [
    TypeOrmModule.forFeature([CommentEntity, UserEntity, PostEntity])
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository]
})
export class CommentModule {}
