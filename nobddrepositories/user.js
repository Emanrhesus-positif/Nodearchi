import { prisma } from "../services/db.js";

const users = [
    {
        id: 1,
        username: 'Jean-Jacques',
        email: 'Xx-Jean-Jacques-du-92-xX@caramail.fr',
        password: 'Azerty1234'
    }
]

export const UserRepository = {
    getUsers: async () => {
        return await prisma.users;
    },
    getUser: async (id) => {
        const user = users.find(user => user.id === id);
        if(!user) throw new Error('user not found');
        else return user;

    },
    getUserbyCredentials: async (email, password) => {
        const user = users.find(user => user.email === email && user.password === password);
        if(!user) throw new Error('user not found');
        else return user;

    },
    createUser: async (user) => {
        const id = users.length + 1;
        const newUser = { id, ...user };
        users.push(newUser);
        return newUser;

    },
 };