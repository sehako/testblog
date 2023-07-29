import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common/decorators';
import { BlogMongoRepository } from './blog.repository';

@Injectable()
export class BlogService {
    constructor(private blogRepository: BlogMongoRepository) {}

    async getAllPosts() {
        return await this.blogRepository.getAllPost();
    }

    async createPost(PostDto: PostDto) {
        return await this.blogRepository.createPost(PostDto);
    }

    async getPost(id): Promise<PostDto> {
        return await this.blogRepository.getPost(id);
    }

    delete(id) {
        return this.blogRepository.deletePost(id);
    }

    updatePost(id, postDto: PostDto) {
        this.blogRepository.updatePost(id, postDto);
    }
}