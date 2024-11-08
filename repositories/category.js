import { prisma } from "../services/db.js";
import { NotFoundError, NotAuthorizedError } from "../utils/errors.js";

export const CategoryRepository = {
    getCategories: async (page, limit) => {
        const categories = await prisma.categories.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return categories;

    },
    getCategory: async (id) => {
        const category = await prisma.categories.findUnique({
            where: {
                id: id
            },
            include: {
                posts:true
            }
        });
        if (!category) {
            throw new NotFoundError('Category not found');
        }
        return category;

    },
    createCategory: async (category) => {
        const newCategory = await prisma.categories.create({
            data: category
        });
        return newCategory;
    },
    updateCategory: async (id, category) => {
        const updatedCategory = await prisma.categories.update({
            where: {
                id: id
            },
            data: category,
        });
        
        return updatedCategory;
    },
    deleteCategory: async (id) => {
        const category = await prisma.categories.delete({
            where: {
                id: id
            }
        });
        if (!category) {
            throw new NotFoundError('Category not found');
        }
        return category;
    }
};
