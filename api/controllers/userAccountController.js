const userAccountService = require('../services/userAccountService');

exports.getUserById = async (req, res) => {
    const userId = await req.params.id;

    try {
        const user = await userAccountService.getUserById(parseInt(userId));

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};