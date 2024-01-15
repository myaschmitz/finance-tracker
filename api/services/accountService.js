const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// create a new account
exports.addAccount = async (accountData) => {
    try {
        const newAccount = await prisma.account.create({
            data: accountData
        });

        return newAccount;

    } catch (error) {
        throw error;
    }
};

// gets all the accounts of a user
exports.getAllAccounts = async () => {
    try {
        const allAccounts = await prisma.account.findMany();
        return allAccounts;

    } catch (error) {
        throw error;
    }
}

// get a specific account by the id
exports.getAccount = async (accountId) => {
    try {
        const account = await prisma.account.findUnique({
            where: { id: accountId }
        });

        return account;

    } catch (error) {
        throw error;
    }
}

// edit a specific account by the id
exports.editAccount = async (accountId, updatedFields) => {
    try {
        const accountExists = await prisma.account.findUnique({
            where: { id: accountId }
        });

        if (!accountExists) {
            throw new Error('Account not found');
        }

        // update the account with the provided fields
        const updatedAccount = await prisma.account.update({
            where: { id: accountId },
            data: updatedFields,
        });

        return updatedAccount;
    } catch (error) {
        throw error;
    }
}

// delete a specific account by the id
exports.deleteAccount = async (accountId) => {
    try {
        const deletedAccount = await prisma.account.delete({
            where: { id: accountId }
        });

        return deletedAccount;
    } catch (error) {
        throw error;
    }
}