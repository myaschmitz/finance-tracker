const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// create a new category
exports.addCategory = async (categoryData) => {
    try {
        const newCategory = await prisma.category.create({
            data: categoryData
        });

        return newCategory;

    } catch (error) {
        throw error;
    }
};

// gets all the categories of a user
exports.getAllCategories = async () => {
    try {
        const allCategories = await prisma.category.findMany();
        return allCategories;

    } catch (error) {
        throw error;
    }
}

// get a specific category by the id
exports.getCategory = async (categoryId) => {
    try {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });

        return category;

    } catch (error) {
        throw error;
    }
}

// edit a specific category by the id
exports.editCategory = async (categoryId, updatedFields) => {
    try {
        const categoryExists = await prisma.category.findUnique({
            where: { id: categoryId }
        });

        if (!categoryExists) {
            throw new Error('Category not found');
        }

        // update the category with the provided fields
        const updatedCategory = await prisma.category.update({
            where: { id: categoryId },
            data: updatedFields,
        });

        return updatedCategory;
    } catch (error) {
        throw error;
    }
}

// delete a specific category by the id
exports.deleteCategory = async (categoryId) => {
    try {
        const deletedCategory = await prisma.category.delete({
            where: { id: categoryId }
        });

        return deletedCategory;
    } catch (error) {
        throw error;
    }
}