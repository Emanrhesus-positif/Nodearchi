import Fastify, { fastify } from 'fastify';
import FastifyCors from '@fastify/cors';
import fastifyAuth from '@fastify/auth';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { registerPostRoutes } from './controllers/post.js';
import { registerAuthRoutes } from './controllers/auth.js';
import { registerUserRoutes } from './controllers/user.js';
import { registerCategoryRoutes } from './controllers/category.js';
import { registerAuthMiddleware } from './middlewares/auth.js';
import { registerErrorMiddleware } from './middlewares/error.js';

//define server
const app = Fastify({ logger: true,
    ajv: {
        customOptions: {removeAdditional: true}
    }
 });

//passing cors options
app.register(FastifyCors, {
    origin: process.env.NODE_ENV == 'production' ? '127.0.0.1' : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

//register auth middleware
await app.register(fastifyAuth);
registerAuthMiddleware(app);

await app.register(fastifySwagger, {
    openapi: {
        components: {
            securitySchemes: {
                token: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
    }
});
await app.register(fastifySwaggerUi,{
    routePrefix: '/documentation',
    uiconfig: {
        docExpansion: 'list'
    }
});

// Register routes
registerErrorMiddleware(app);
registerCategoryRoutes(app);
registerPostRoutes(app);
registerAuthRoutes(app);
registerUserRoutes(app);

//default route
app.get('/', async (request, reply) => {
    return { hello: 'world' };
});

//server start and run
try {
    await app.listen({
        port: process.env.PORT || 3000,
        host: process.env.HOST || localhost
    });
    await app.ready();
    console.log(`Server listening on ${app.server.address().port}`);
}
catch (err) {
    app.log.error(err);
    process.exit(1);
}
