import React, { useState, useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TextField, Button, FormControl, MenuItem, Select } from "@mui/material";
import { MdOutlineModeEdit } from "react-icons/md";

export default function Transactions() {
    useEffect(() => {
        // select all <tr> elements within the <tbody> and add the "hover" class
        const trElements = document.querySelectorAll('tbody tr');
        trElements.forEach((tr) => {
            tr.classList.add('hover');
        });
    }, []);

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

    // handle when the transaction input is changed
    const handleInputChange = (e) => {
        const { name, value } = e.target.value;
        setFormData({ ...formData, [name]: value });
    };

    // handle when the transaction date input is changed
    const handleDateChange = (date) => {
        setFormData({ ...formData, date: date.toISOString() });
    };

    // handle submitting transaction info
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9000/transactions/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Transaction created successfully');
                // Reset the form or perform other actions
            } else {
                console.error('Failed to create transaction');
            }
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-4xl font-bold section-title">Add Transaction</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Merchant</span>
                        </div>
                        <TextField name="merchant" id="outlined-basic" color="primary" value={formData.merchant} onChange={handleInputChange} sx={{ border: 'var(--color-light-font) solid 1px', '& input': { color: 'var(--color-light-font)' } }} />
                    </label>
                    <br />
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Amount</span>
                        </div>
                        <TextField name="amount" id="outlined-basic" color="primary" value={formData.amount} onChange={handleInputChange} sx={{ border: 'var(--color-light-font) solid 1px', '& input': { color: 'var(--color-light-font)' } }} />
                    </label>
                    <br />
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Date</span>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                name="date"
                                value={formData.date}
                                onChange={handleDateChange}
                                format="YYYY-MM-DD"
                                sx={{ border: 'var(--color-light-font) solid 1px', '& input': { color: 'var(--color-light-font)' }, '& svg': { color: 'var(--color-light-font)' } }}
                            />
                        </LocalizationProvider>
                    </label>
                    <br />
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Type</span>
                        </div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                value={formData.type}
                                onChange={handleInputChange}
                                displayEmpty
                                sx={{ border: 'var(--color-light-font) solid 1px', color: 'var(--color-light-font)', '& input': { color: 'var(--color-light-font)' }, '& svg': { color: 'var(--color-light-font)' } }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"bank"}>Bank</MenuItem>
                                <MenuItem value={"credit"}>Credit</MenuItem>
                                <MenuItem value={"debit"}>Debit</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <select className="select select-md select-bordered" name="type" value={formData.type} onChange={handleInputChange}>
                            <option disabled value="">Choose transaction type</option>
                            <option value="bank">Bank</option>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select> */}
                    </label>
                    <br />
                    {/* <button className="btn btn-outline" type="submit">Submit</button> */}
                    <Button color="primary" variant="outlined" type="submit">Submit</Button>
                </form>
                <br />
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
                <h1 className="text-4xl font-bold">Transactions</h1>
                <table className="table table-pin-rows">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Merchant</th>
                            <th>Account</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionMessage.map((transaction, index) => (
                            <tr key={index}>
                                <td>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </td>
                                <td>{transaction.merchant}</td>
                                <td>{transaction.account_id}</td>
                                <td>{new Date(transaction.date).toISOString().split('T')[0]}</td>
                                <td>${transaction.amount}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.category_id}</td>
                                <td><MdOutlineModeEdit /></td>
                            </tr>
                        ))}
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Account</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Edit</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    )
}