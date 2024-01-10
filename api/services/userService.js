const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getUserById = async (userId) => {
    try {
        const user = await prisma.user_account.findUnique({
            where: { id: userId },
            select: { id: true, email: true },
        });

        return user;

    } catch (error) {
        throw error;
    }
};