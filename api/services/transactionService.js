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

// gets all the transactions of a user
exports.getAllTransactions = async () => {
    try {
        const allTransactions = await prisma.transaction.findMany();
        return allTransactions;

    } catch (error) {
        throw error;
    }
}

// get a specific transaction by the id
exports.getTransaction = async (transactionId) => {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId }
        });

        return transaction;

    } catch (error) {
        throw error;
    }
}

// edit a specific transaction by the id
exports.editTransaction = async (transactionId, updatedFields) => {
    try {
        const transactionExists = await prisma.transaction.findUnique({
            where: { id: transactionId }
        });

        if (!transactionExists) {
            throw new Error('Transaction not found');
        }

        // update the transaction with the provided fields
        const updatedTransaction = await prisma.transaction.update({
            where: { id: transactionId },
            data: updatedFields,
        });

        return updatedTransaction;
    } catch (error) {
        throw error;
    }
}

// delete a specific transaction by the id
exports.deleteTransaction = async (transactionId) => {
    try {
        const deletedTransaction = await prisma.transaction.delete({
            where: { id: transactionId }
        });

        return deletedTransaction;
    } catch (error) {
        throw error;
    }
}