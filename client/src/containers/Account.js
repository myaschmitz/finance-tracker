import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';

export default function Account() {
    const [message, setMessage] = useState('');
    useEffect(() => {
        fetch('http://localhost:9000/users/get/1')
            .then((res) => res.json())
            .then((data) => setMessage(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container">
            <h1 className="section-title">Account</h1>
            <div className="account-layout">
                <p>Your email address is <b>{message['email']}</b>.</p>
                <Button type="submit">Change</Button>
                <br />
            </div>
            <div>
                <p>Institutions</p>
            </div>
            <div className="divider"></div>
            <div>
                <h1 className="section-title">Danger Zone</h1>
                {/* <h2 className="text-2xl font-bold">Reset Account</h2>
                <p>Would you like to reset your account?<br/>All of your data will be permanently deleted.</p>
                <button className="underline delete-account">Reset my account.</button> */}
                <h2 className="font-bold">Delete Account</h2>
                <p>Would you like to delete your account?<br />Your account and all of your data will be permanently
                    deleted. Once your account is deleted, you will no longer be able to retrieve your data.</p>
                <Button className="delete-account">Delete my account.</Button>
            </div>
        </div>
    )
}