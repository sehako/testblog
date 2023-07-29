import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './Blog.schema';

//블로그 리포지토리 인터페이스 정의
export interface BlogRepository {
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: PostDto);
    getPost(id: string): Promise<PostDto>;
    deletePost(id: string);
    updatePost(id: string, postDto: PostDto);
}

@Injectable()
//몽고디비용 리포지토리
export class BlogMongoRepository implements BlogRepository {
    //Model<BlogDocument> 타입인 blogModel 주입
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

    //모든 게시글 가져오기
    async getAllPost(): Promise<PostDto[]> {
        return await this.blogModel.find().exec();
    }
    //게시글 작성
    async createPost(postDto: PostDto) {
        const createPost = {
            ...postDto,
            createDt: new Date(),
            updateDt: new Date(),
        };
        this.blogModel.create(createPost);
    }

    async getPost(id: string): Promise<PostDto> {
        return await this.blogModel.findById(id);
    }
    //게시글 하나 삭제하기
    async deletePost(id: string) {
        await this.blogModel.findByIdAndDelete(id);
    }

    //게시글 업데이트

    async updatePost(id: string, postDto: PostDto) {
        const updatePost = { id, ...postDto, updateDt: new Date() };
        await this.blogModel.findByIdAndUpdate(id, updatePost);
    }
}