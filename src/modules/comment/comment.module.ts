import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './model/CommentEntity';

@Module({
  imports : [
    TypeOrmModule.forFeature([CommentEntity])
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository]
})
export class CommentModule {}
