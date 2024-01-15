import React, { useState, useEffect } from "react";
import CustomAccordionExpandIcon from "../components/CustomAccordionExpandIcon";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {
    TextField, Button, FormControl, MenuItem, Select,
    Accordion, AccordionSummary, AccordionDetails, Typography
} from "@mui/material";
import GroupPopover from "./GroupCategoryPopover";
import TransactionsTable from "./TransactionsTable";

export default function Transactions() {
    // get all categories from database
    const [categoriesMessage, setCategoriesMessage] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9000/categories/all')
            .then((res) => res.json())
            .then((data) => setCategoriesMessage(data))
            .catch((err) => console.log(err));
    }, []);

    // get all accounts from database
    const [accountsMessage, setAccountsMessage] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9000/accounts/all')
            .then((res) => res.json())
            .then((data) => setAccountsMessage(data))
            .catch((err) => console.log(err));
    }, []);

    const [transactionFormData, setTransactionFormData] = useState({
        user_account_id: 1,
        merchant: '',
        account_id: '',
        amount: '',
        category_id: '',
        date: new Date(),
        type: ''
    });

    // handle when the transaction input is changed
    const handleTransactionInputChange = (e) => {
        const { name, value } = e.target;

        // if (name == "category_id") {
        try {
            setTransactionFormData({ ...transactionFormData, [name]: ((name == "category_id") ? parseInt(value, 10) : value) });
        } catch (error) {
            console.log("Category Id error: " + error);
        }
    };

    // handle when the transaction date input is changed
    const handleTransactionDateChange = (date) => {
        try {
            if (date) {
                setTransactionFormData({ ...transactionFormData, date: date.toISOString() });
            }
        } catch (error) {
            console.log("Date.toISOString() error: " + error);
        }
    };

    // handle submitting transaction info
    const handleTransactionSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9000/transactions/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionFormData),
            });

            if (response.ok) {
                console.log('Transaction created successfully');

                // reset the form
                setTransactionFormData({
                    user_account_id: 1,
                    merchant: '',
                    account_id: '',
                    amount: '',
                    category_id: '',
                    date: new Date(),
                    type: ''
                });
            } else {
                console.error('Failed to create transaction');
            }
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    return (
        <div className="container">
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<CustomAccordionExpandIcon />}
                    // aria-controls="panel1-content"
                    // id="panel1-header"
                    >
                        <Typography>Add Transaction</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form onSubmit={handleTransactionSubmit}>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Merchant</span>
                                </div>
                                <TextField
                                    name="merchant"
                                    id="outlined-basic"
                                    color="darkBlue"
                                    value={transactionFormData.merchant}
                                    onChange={handleTransactionInputChange}
                                    size="small"
                                    required
                                />
                            </label>
                            <br />
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Account</span>
                                </div>
                                <FormControl>
                                    <Select
                                        name="account_id"
                                        value={transactionFormData.account_id}
                                        onChange={handleTransactionInputChange}
                                        size="small"
                                        required
                                        autoWidth
                                        displayEmpty
                                    >
                                        <MenuItem disabled value=''>
                                            <em>Choose an account</em>
                                        </MenuItem>
                                        {accountsMessage.map((account, index) => (
                                            <MenuItem key={index} value={account.id}>
                                                {account.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </label>
                            <br />
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Date</span>
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        name="date"
                                        value={dayjs(transactionFormData.date)}
                                        onClose={handleTransactionDateChange}
                                        format="YYYY-MM-DD"
                                        required
                                    />
                                </LocalizationProvider>
                            </label>
                            <br />
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Amount</span>
                                </div>
                                <TextField
                                    name="amount"
                                    id="outlined-basic"
                                    color="darkBlue"
                                    value={transactionFormData.amount}
                                    onChange={handleTransactionInputChange}
                                    size="small"
                                    required
                                />
                            </label>
                            <br />
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Type</span>
                                </div>
                                <FormControl>
                                    <Select
                                        name="type"
                                        value={transactionFormData.type}
                                        onChange={handleTransactionInputChange}
                                        size="small"
                                        required
                                        autoWidth
                                        displayEmpty
                                    >
                                        <MenuItem disabled value="">
                                            <em>Choose a transaction type</em>
                                        </MenuItem>
                                        <MenuItem value="bank">Bank</MenuItem>
                                        <MenuItem value="credit">Credit</MenuItem>
                                        <MenuItem value="debit">Debit</MenuItem>
                                    </Select>
                                </FormControl>
                                <br />
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Category</span>
                                    </div>
                                    <FormControl>
                                        <Select
                                            name="category_id"
                                            value={transactionFormData.category_id}
                                            onChange={handleTransactionInputChange}
                                            size="small"
                                            required
                                            autoWidth
                                            displayEmpty
                                        >
                                            <MenuItem disabled value=''>
                                                <em>Choose a category</em>
                                            </MenuItem>
                                            {categoriesMessage.map((category, index) => (
                                                <MenuItem key={index} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </label>
                            </label>
                            <br />
                            <Button color="darkBlue" variant="outlined" type="submit">Submit</Button>
                        </form>
                    </AccordionDetails>
                </Accordion>
            </div>
            <br />
            <GroupPopover />
            <TransactionsTable />
        </div>
    )
}