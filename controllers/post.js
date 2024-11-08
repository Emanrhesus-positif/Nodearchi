import { PostRepository } from '../repositories/post.js';
import { PostCategoryRepository } from '../repositories/postCategory.js';
import { CreatePostDto, GetPostsDto, GetPostDto, UpdatePostDto, DeletePostDto } from '../dtos/PostDtos.js';

export function registerPostRoutes(fastify){
    fastify.get('/posts', {schema: GetPostsDto }, async (request, reply) => {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;

        return await PostRepository.getPosts(page, limit);
    });
    fastify.get('/posts/:id', {schema: GetPostDto}, async (request, reply) => {
        const id = parseInt(request.params.id);
        return await PostRepository.getPost(id);
    });
    fastify.get('/posts/user', {
        preHandler: fastify.auth([fastify.authUser]),
        }, async (request, reply) => {
            return await PostRepository.getAllUserPosts(request.user.id);
    });
    fastify.post('/posts', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: CreatePostDto
        }, async (request, reply) => {
            const {categories, ...newPost} = request.body;
            newPost.authorId = request.user.id;
            const createdPost = await PostRepository.createPost(newPost);
            console.log("info post a creer", newPost);
            console.log("info post cree", createdPost);
            console.log("info categories", request.body.categories);
            if (request.body.categories !== undefined || request.body.categories.length > 0) {
                request.body.categories.map((categoryId) => {
                    PostCategoryRepository.createPostCategory(createdPost.id, categoryId);
                });
            }
            console.log(newPost);
            return 
    });
    fastify.put('/posts/:id', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: UpdatePostDto
        }, async (request, reply) => {
            const id = parseInt(request.params.id);
            const body = request.body;
            body.authorId = request.user.id;
            return await PostRepository.updatePost(id, body);
    });
    fastify.delete('/posts/:id', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: DeletePostDto
        }, async (request, reply) => {
            const id = parseInt(request.params.id);
            return await PostRepository.deletePost(id);
    });
    
}
