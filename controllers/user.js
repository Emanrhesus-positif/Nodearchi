import { UserRepository } from '../repositories/user.js';
import { GetUserDto, GetUsersDto } from '../dtos/UserDtos.js';

export function registerUserRoutes(fastify){
    // fastify.post('/user', async (request, reply) => {
    //     const email = request.body.email;
    //     const password = request.body.password;
    //     const username = request.body.username;

    //     return await UserRepository.getUser(username, email, password);
    // });

    fastify.post('/user/id', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: GetUserDto,
    }, async (request, reply) => {
        const email = request.body.email;
        return await UserRepository.getUser();
    });
    fastify.get('/users', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: GetUsersDto
    }, async (request, reply) => {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        return await UserRepository.getUsers(page, limit);
    });
    
}
