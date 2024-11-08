export const PublicUserDto = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        username: { type: 'string' },
    },
};
const ModelUserDto = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        username: { type: 'string' },
        email: { type: 'string' },
    },
    required: ['id', 'username', 'email'],
};
const AuthenticatedUserDto = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        username: { type: 'string' },
        email: { type: 'string' },
        token: { type: 'string' },
    },
    required: ['id', 'username', 'email', 'token'],
};

export const CreateUserDto = {
    body: {
        type: 'object',
        properties: {
            username: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['username', 'email', 'password'],
    },
    response: {
        200: ModelUserDto,
    },
};

export const GetUserDto = {
    security: [{ token: [] }],
    querystring: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        required: ['id'],
    },
    response: {
        200: ModelUserDto,
    },
};
export const GetLogin = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['email', 'password'],
    },
    response: {
        200: AuthenticatedUserDto,
    },
};
export const GetUsersDto = {
    security: [{ token: [] }],
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
        },
    },
    response: {
        200: {
            type: 'array',
            items: ModelUserDto,
        },
    },
};
