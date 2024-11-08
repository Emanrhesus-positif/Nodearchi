import { PublicUserDto } from './UserDtos.js';
import { PublicCategoryDto } from './CategoryDtos.js';

export const PublicPostDto = {
    type: 'object',
            properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                content: { type: 'string' },
                author: PublicUserDto,
            },
            required: ['id', 'title', 'content'],
};
const ModelPostDto = {
    type: 'object',
            properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                content: { type: 'string' },
                author: PublicUserDto,
                categories: {
                    type: 'array',
                    items: PublicCategoryDto,
                },
            },
            required: ['id', 'title', 'content'],
};

export const CreatePostDto = {
    security: [{ token: [] }],
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            categories: {
                type: 'array',
                items: { type: 'number' },
            },
        },
        required: ['title', 'content'],
    },
    response: {
        200: ModelPostDto,
    },
};

export const GetPostsDto = {
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
            items: ModelPostDto,
        },
    },
}

export const GetPostDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        required: ['id'],
    },
    response: {
        200: ModelPostDto,
    },
};
export const UpdatePostDto = {
    security: [{ token: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        required: ['id'],
    },
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            categories: {
                type: 'array',
                items: { type: 'number' },
            },
        },
    },
    response: {
        200: ModelPostDto,
    },
};
export const DeletePostDto = {
    security: [{ token: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        required: ['id'],
    },
    response: {
        200: ModelPostDto,
    },
};