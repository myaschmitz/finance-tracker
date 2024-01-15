const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// create a new group
exports.addGroup = async (groupData) => {
    try {
        const newGroup = await prisma.group.create({
            data: groupData
        });

        return newGroup;

    } catch (error) {
        throw error;
    }
};

// gets all the groups of a user
exports.getAllGroups = async () => {
    try {
        const allGroups = await prisma.group.findMany();
        return allGroups;

    } catch (error) {
        throw error;
    }
}

// get a specific group by the id
exports.getGroup = async (groupId) => {
    try {
        const group = await prisma.group.findUnique({
            where: { id: groupId }
        });

        return group;

    } catch (error) {
        throw error;
    }
}

// edit a specific group by the id
exports.editGroup = async (groupId, updatedFields) => {
    try {
        const groupExists = await prisma.group.findUnique({
            where: { id: groupId }
        });

        if (!groupExists) {
            throw new Error('Group not found');
        }

        // update the group with the provided fields
        const updatedGroup = await prisma.group.update({
            where: { id: groupId },
            data: updatedFields,
        });

        return updatedGroup;
    } catch (error) {
        throw error;
    }
}

// delete a specific group by the id
exports.deleteGroup = async (groupId) => {
    try {
        const deletedGroup = await prisma.group.delete({
            where: { id: groupId }
        });

        return deletedGroup;
    } catch (error) {
        throw error;
    }
}