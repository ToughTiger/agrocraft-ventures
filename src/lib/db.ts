import { PrismaClient } from '@prisma/client'

// Prisma Client is initialized just once per application lifecycle
const prisma = new PrismaClient()

export default prisma;
