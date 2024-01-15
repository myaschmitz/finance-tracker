import React, { useState, useEffect } from "react";
import { TextField, Button, FormControl, MenuItem, Select } from "@mui/material";

export default function Categories() {
    const categoryInput = {
        user_account_id: 1,
        name: '',
        amount: '',
        group_id: undefined,
        parent_category_id: ''
    };

    // get all categories from database
    const [categoryMessage, setCategoryMessage] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9000/categories/all')
            .then((res) => res.json())
            .then((data) => setCategoryMessage(data))
            .catch((err) => console.log(err));
    }, []);

    const [categoryFormData, setCategoryFormData] = useState(categoryInput);

    // handle submitting transaction info
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9000/groups/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupFormData),
            });

            if (response.ok) {
                console.log('Group created successfully');

                // reset the form
                setTransactionFormData(transactionInput);
            } else {
                console.error('Failed to create group');
            }
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    return (
        <div className="container">

        </div>
    )

}