import { prisma } from "../services/db.js";
import { NotFoundError } from "../utils/errors.js";

export const UserRepository = {
    getUsers: async (page, limit) => {
        const users = await prisma.users.findMany();
        return await users;
    },
    getUser: async (id) => {
        const user = await prisma.users.findUnique({
            where: {
                id: id
            }
        });
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user;

    },
    getUserbyCredentials: async (email, password) => {
        const user = await prisma.users.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    },
    createUser: async (user) => {
        const newUser = await prisma.users.create({
            data: user
        });
        return newUser;
    },
 };