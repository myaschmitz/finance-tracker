import React, { useState, useEffect } from "react";
import { TextField, Button, FormControl, MenuItem, Select } from "@mui/material";

export default function Groups() {
    const groupInput = {
        user_account_id: 1,
        name: ''
    };

    const [groupMessage, setGroupMessage] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9000/groups/all')
            .then((res) => res.json())
            .then((data) => setGroupMessage(data))
            .catch((err) => console.log(err));
    }, []);

    const [groupFormData, setGroupFormData] = useState(groupInput);

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