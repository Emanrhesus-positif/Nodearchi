import { prisma } from "../services/db.js";
const posts = [
    {
        id: 1,
        title: 'Hello world',
        content: 'this is a post about hello world',
    }
]

export const PostRepository = {
    getPosts: async (page, limit) => {
        const start = (page - 1) * limit;
        const end = start + limit;
        return posts;

    },
    getPost: async (id) => {
        const post = posts.find(post => post.id === id);
        if(!post) throw new Error('Post not found');
        else return post;

    },
    createPost: async (post) => {
        const id = posts.length + 1;
        const newPost = { id, ...post };
        posts.push(newPost);
        return newPost;

    },
    updatePost: async (id, post) => {
        const oldPost = posts.find(post => post.id === id);
        const index = posts.findIndex(post => post.id === id);
        if(!oldPost) throw new Error('Post not found');
        const newPost = { id, ...oldPost, ...post };
        posts[index] = newPost;
        return newPost;

    },
    deletePost: async (id) => {
        const post = posts.find(post => post.id === id);
        if(!post) throw new Error('Post not found');
        const deleted = posts.splice(post, 1)
        return post;
    }
};
