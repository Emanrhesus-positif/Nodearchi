import { prisma } from "../services/db.js";
import { NotFoundError, NotAuthorizedError } from "../utils/errors.js";

export const PostRepository = {
    getPosts: async (page, limit) => {
        const posts = await prisma.posts.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                author:true
            }
        });
        return posts;

    },
    getPost: async (id) => {
        const post = await prisma.posts.findUnique({
            where: {
                id: id
            },
            include: {
                categories:true,
            }
        });
        if (!post) {
            throw new NotFoundError('Post not found');
        }
        return post;

    },
    // getAllUserPosts: async (userId) => {
    //     const posts = await prisma.posts.findMany({
    //         where: {
    //             authorId: userId
    //         }
    //     });
    //     return posts;
    // },
    createPost: async (post) => {
        const newPost = await prisma.posts.create({
            data: post
        });
        return newPost;
    },
    updatePost: async (id, post) => {
        const postExists = await prisma.posts.findUnique({
            where: {
                id: id
            }
        });
        if(post.authorId !== postExists.authorId){
            throw new NotAuthorizedError('User not authorized to update post');
        }else{
            const updatedPost = await prisma.posts.update({
                where: {
                    id: id
                },
                data: post,
                include: {
                    author:true,
                    categories:true
                }
            });
            if (!updatedPost) {
                throw new NotFoundError('Post not found');
            }
            return updatedPost;
        }
    },
    deletePost: async (id) => {
        const post = await prisma.posts.delete({
            where: {
                id: id
            }
        });
        if (!post) {
            throw new NotFoundError('Post not found');
        }
        return post;
    }
};
