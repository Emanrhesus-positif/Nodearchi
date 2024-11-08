
export function registerErrorMiddleware(fastify) {
    fastify.setErrorHandler((error, request, reply) => {
        if (error.name === "NotFoundError") {
            reply.status(404).send({ ok: false, message: error.message });
        } else if (error.name === "NotAuthorizedError") {
            reply.status(401).send({ ok: false, message: error.message });
        } else {
            console.error(error);
            reply.status(500).send({ ok: false });
        } 
    });
}