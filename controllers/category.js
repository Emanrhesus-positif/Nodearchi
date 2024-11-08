import { CategoryRepository } from '../repositories/category.js';
import { CreateCategoryDto, GetCategoriesDto, GetCategoryDto, UpdateCategoryDto, DeleteCategoryDto } from '../dtos/CategoryDtos.js';
export function registerCategoryRoutes(fastify){
    fastify.get('/categories', {schema: GetCategoriesDto }, async (request, reply) => {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;

        return await CategoryRepository.getCategories(page, limit);
    });
    fastify.get('/categories/:id', {schema: GetCategoryDto}, async (request, reply) => {
        const id = parseInt(request.params.id);
        return await CategoryRepository.getCategory(id);
    });
    fastify.post('/categories', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: CreateCategoryDto
        }, async (request, reply) => {
            return await CategoryRepository.createCategory(request.body);
    });
    fastify.put('/categories/:id', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: UpdateCategoryDto
        }, async (request, reply) => {
            const id = parseInt(request.params.id);
            return await CategoryRepository.updateCategory(id, request.body);
    });
    fastify.delete('/categories/:id', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: DeleteCategoryDto
        }, async (request, reply) => {
            const id = parseInt(request.params.id);
            return await CategoryRepository.deleteCategory(id);
    });
}