import { PublicPostDto } from './PostDtos.js';

export const PublicCategoryDto = {
    type: 'object',
        properties: {
            id: { type: 'number' },
            name: { type: 'string' },
        },
}
const ModelCategoryDto = {
    type: 'object',
        properties: {
            id: { type: 'number' },
            name: { type: 'string' },
        },
        required: ['id', 'name'],
};

export const CreateCategoryDto = {
    security: [{ token: [] }],
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            },
        required: ['name'],
        },
    response: {
        200: ModelCategoryDto,
    },
};

export const GetCategoriesDto = {
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
            items: ModelCategoryDto,
        },
    },
};

export const GetCategoryDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        required: ['id'],
    },
    response: {
        200: ModelCategoryDto,
    },
};

export const UpdateCategoryDto = {
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
            name: { type: 'string' },
        },
        required: ['name'],
    },
    response: {
        200: ModelCategoryDto,
    },
};

export const DeleteCategoryDto = {
    security: [{ token: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        required: ['id'],
    },
    response: {
        200: ModelCategoryDto,
    },
};