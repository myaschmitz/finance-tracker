import React, { useState, useEffect } from "react";

export default function TransactionsTable() {
    // get all transactions from database
    const [transactionMessage, setTransactionMessage] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9000/transactions/all')
            .then((res) => res.json())
            .then((data) => setTransactionMessage(data))
            .catch((err) => console.log(err));
    }, []);

    const [formData, setFormData] = useState({
        user_account_id: 1,
        merchant: '',
        account_id: 1,
        amount: '',
        category_id: null,
        date: null,
        type: '',
    });


    
}