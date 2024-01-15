const categoryService = require('../services/categoryService');

exports.addCategory = async (req, res) => {
    const { user_account_id, name, account_id, amount, category_id, group_id, parent_category_id } = req.body;

    try {
        const categoryData = {
            user_account_id,
            name, account_id,
            amount,
            category_id,
            group_id,
            parent_category_id
        };

        const newCategory = await categoryService.addCategory(categoryData);
        res.json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const allCategories = await categoryService.getAllCategories();
        res.json(allCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const category = await categoryService.getCategory(parseInt(req.params.id, 10));

        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }

        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.editCategory = async (req, res) => {
    try {
        const category = await categoryService.editCategory(parseInt(req.params.id, 10), req.body);

        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }

        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await categoryService.deleteCategory(parseInt(req.params.id, 10));

        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }

        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
