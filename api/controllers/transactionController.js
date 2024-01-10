const transactionService = require('../services/transactionService');

exports.addTransaction = async (req, res) => {
    const { user_account_id, merchant, account_id, amount, category_id, date, type } = req.body;

    try {
        const transactionData = {
            user_account_id,
            merchant,
            account_id,
            amount,
            category_id,
            date,
            type,
        };

        const newTransaction = await transactionService.addTransaction(transactionData);
        res.json(newTransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const allTransactions = await transactionService.getAllTransactions();
        res.json(allTransactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTransaction = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transaction = await transactionService.getTransaction(parseInt(transactionId, 10));

        if (!transaction) {
            res.status(404).json({ error: 'Transaction not found' });
            return;
        }

        res.json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
