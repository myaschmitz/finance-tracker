const accountService = require('../services/accountService');

exports.addAccount = async (req, res) => {
    const { name, balance } = req.body;

    try {
        const accountData = {
            name,
            balance
        };

        const newAccount = await accountService.addAccount(accountData);
        res.json(newAccount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllAccounts = async (req, res) => {
    try {
        const allAccounts = await accountService.getAllAccounts();
        res.json(allAccounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAccount = async (req, res) => {
    try {
        const account = await accountService.getAccount(parseInt(req.params.id, 10));

        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }

        res.json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.editAccount = async (req, res) => {
    try {
        const account = await accountService.editAccount(parseInt(req.params.id, 10), req.body);

        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }

        res.json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const account = await accountService.deleteAccount(parseInt(req.params.id, 10));

        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }

        res.json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
