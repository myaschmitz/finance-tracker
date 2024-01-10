const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// create a new transaction
exports.addTransaction = async (transactionData) => {
    try {
        const newTransaction = await prisma.transaction.create({
            data: transactionData
        });

        return newTransaction;

    } catch (error) {
        throw error;
    }
};

exports.getAllTransactions = async () => {
    try {
        const allTransactions = await prisma.transaction.findMany();
        return allTransactions;

    } catch (error) {
        throw error;
    }
}

exports.getTransaction = async (transactionId) => {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId },
            select: true,
        });

        return transaction;

    } catch (error) {
        throw error;
    }
}