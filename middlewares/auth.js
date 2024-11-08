//ajout de la crypto du mot de passe
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.js';

export function registerAuthMiddleware(fastify) {
    fastify.decorate('authUser', async (request, reply) => {
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            reply.code(401).send({ error: 'No token provided' });
            return;
        }
        const token = authHeader.replace('Bearer ', '');
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await UserRepository.getUser(decoded.id);
            if (!user) {
                reply.code(401).send({ error: 'Invalid token authentified' });
                return;
            }
            request.user = user;
        } catch (err) {
            console.log(err);
            reply.code(401).send({ error: 'Invalid token recognition' });
            return;
        }
    });
}