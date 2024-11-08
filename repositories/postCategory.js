import { prisma } from "../services/db.js";
import { NotFoundError, NotAuthorizedError } from "../utils/errors.js";

export const PostCategoryRepository = {
    getPostCategories: async (page, limit) => {
        const postCategories = await prisma.CategoriesOnPosts.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return postCategories;

    },
    getPostCategory: async (id) => {
        const postCategory = await prisma.CategoriesOnPosts.findUnique({
            where: {
                id: id
            }

        });
        if (!postCategory) {
            throw new NotFoundError('PostCategory not found');
        }
        return postCategory;

    },
    createPostCategory: async (idPost, idCategory) => {
        const newPostCategory = await prisma.CategoriesOnPosts.create({
            data: {
                postId: idPost,
                categoryId: idCategory
            }
        });
        return newPostCategory;
    },
    // updatePostCategory: async (id, postCategory) => {
    //     const updatedPostCategory = await prisma.postCategories.update({
    //         where: {
    //             id: id
    //         },
    //         data: postCategory,
    //     });
        
    //     return updatedPostCategory;
    // },
    // deletePostCategory: async (id) => {
    //     const postCategory = await prisma.postCategories.delete({
    //         where: {
    //             id: id
    //         }
    //     });
    //     if (!postCategory) {
    //         throw new NotFoundError('PostCategory not found');
    //     }
    //     return postCategory;
    // }
};