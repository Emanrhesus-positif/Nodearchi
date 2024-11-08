
import { UserRepository } from '../repositories/user.js';
import { CreateUserDto, GetLogin } from '../dtos/UserDtos.js';
import JWT from 'jsonwebtoken';
import { createHash } from 'crypto';

export function registerAuthRoutes(fastify){

    fastify.post('/signup', {schema: CreateUserDto}, async (request, reply) => {
        
        const body = request.body;
        body.password = createHash('sha1')
            .update(body.password+process.env.PASSWORD_SALT)
            .digest('hex');
        
        return await UserRepository.createUser(body);

    });
    fastify.post('/login', {schema: GetLogin},async (request, reply) => {
        const body = request.body;
        body.password = createHash('sha1')
            .update(body.password+process.env.PASSWORD_SALT)
            .digest('hex');
     
        const user = await UserRepository.getUserbyCredentials(body.email, body.password);
        if (!user) {
            reply.code(401);
            return {error: 'Invalid credentials'};
        }
        user.token = JWT.sign({id: user.id}, process.env.JWT_SECRET);
        return user;
    });
    
}