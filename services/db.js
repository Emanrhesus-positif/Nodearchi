import { PrismaClient } from '@prisma/client';

//Conects to DB using .env config
let client = new PrismaClient();
console.log("[DEBUG] Connected to DB");

//Returns a PrismaClient instance that is cached
export const prisma = client;