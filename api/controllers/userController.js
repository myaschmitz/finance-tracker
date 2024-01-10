const userService = require('../services/userService');

exports.getUserById = async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};