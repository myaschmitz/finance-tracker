import React, { useState, useEffect } from "react";
import {
    TextField, Button, Stack, IconButton, Popover, FormControl, Select, MenuItem
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function GroupPopover() {
    // items to support Group popover and input
    const [anchorElGroupInput, setAnchorElGroupInput] = useState(null);

    const handleAddGroupOpenClick = (e) => {
        setAnchorElGroupInput(e.currentTarget);
    }
    const handleAddGroupClose = () => {
        setAnchorElGroupInput(null);
    };

    const addGroupOpen = Boolean(anchorElGroupInput);
    const addGroupId = addGroupOpen ? 'simple-popover' : undefined;

    const [groupFormData, setGroupFormData] = useState({
        user_account_id: 1,
        name: ''
    });

    async function addGroup(groupFormData) {
        const response = await fetch('http://localhost:9000/groups/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(groupFormData),
        })
            .then(() => {
                window.location.reload();
            });

        return response;
    }

    // handle when the group input is changed
    const handleGroupInputChange = (e) => {
        const { name, value } = e.target;
        setGroupFormData({ ...groupFormData, [name]: value });
    };

    // handle submitting group info
    const handleGroupSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = addGroup(groupFormData);

            if (response.ok) {
                console.log('Group created successfully');

                // reset the form
                setGroupFormData({
                    user_account_id: 1,
                    name: ''
                });
            } else {
                console.error('Failed to create group');
            }
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    // get all groups from database
    const [groupsMessage, setGroupsMessage] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9000/groups/all')
            .then((res) => res.json())
            .then((data) => setGroupsMessage(data))
            .catch((err) => console.log(err));
    }, []);

    // items to support Category popover and input
    const [anchorElCategoryInput, setAnchorElCategoryInput] = useState(null);

    const handleAddCategoryOpenClick = (e) => {
        setAnchorElCategoryInput(e.currentTarget);
    }
    const handleAddCategoryClose = () => {
        setAnchorElCategoryInput(null);
    };

    const addCategoryOpen = Boolean(anchorElCategoryInput);
    const addCategoryId = addGroupOpen ? 'simple-popover' : undefined;

    const [categoryFormData, setCategoryFormData] = useState({
        user_account_id: 1,
        name: '',
        amount: undefined,
        group_id: '',
        parent_category_id: undefined
    });

    // handle when the category input is changed
    const handleCategoryInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryFormData({ ...categoryFormData, [name]: value });
    };

    // handle submitting category info
    const handleCategorySubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9000/categories/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryFormData),
            })
                .then(() => {
                    window.location.reload();
                });
            ;

            if (response.ok) {
                console.log('Category created successfully');

                // reset the form
                setCategoryFormData({
                    user_account_id: 1,
                    name: '',
                    amount: undefined,
                    group_id: '',
                    parent_category_id: undefined,
                });
            } else {
                console.error('Failed to create category');
            }
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <div className="popover-container">
            <div>
                <Stack direction="row" spacing={2} alignItems="center">
                    Add Group
                    <IconButton aria-describedby="addGroupId" color="primary" onClick={handleAddGroupOpenClick}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Stack>
                <Popover
                    id={addGroupId}
                    open={addGroupOpen}
                    anchorEl={anchorElGroupInput}
                    onClose={handleAddGroupClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <form className="popover-form" onSubmit={handleGroupSubmit}>
                        <label>
                            <div className="label">
                                <span className="label-text">Group Name</span>
                            </div>
                            <TextField
                                name="name"
                                id="outlined-basic"
                                color="darkBlue"
                                value={groupFormData.name}
                                onChange={handleGroupInputChange}
                                size="small"
                                required
                            />
                        </label>
                        <br />
                        <Button color="darkBlue" variant="outlined" type="submit">Submit</Button>
                    </form>
                </Popover>
            </div>
            <div>
                <Stack direction="row" spacing={2} alignItems="center">
                    Add Category
                    <IconButton aria-describedby="addCategoryId" color="primary" onClick={handleAddCategoryOpenClick}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Stack>
                <Popover
                    id={addCategoryId}
                    open={addCategoryOpen}
                    anchorEl={anchorElCategoryInput}
                    onClose={handleAddCategoryClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <form className="popover-form" onSubmit={handleCategorySubmit}>
                        <label>
                            <div className="label">
                                <span className="label-text">Category Name</span>
                            </div>
                            <TextField
                                name="name"
                                id="outlined-basic"
                                value={categoryFormData.name}
                                onChange={handleCategoryInputChange}
                                size="small"
                                required
                            />
                        </label>
                        <label>
                            <div className="label">
                                <span className="label-text">Group Assignment</span>
                            </div>
                            <FormControl>
                                <Select
                                    name="group_id"
                                    value={categoryFormData.group_id}
                                    onChange={handleCategoryInputChange}
                                    size="small"
                                    required
                                    autoWidth
                                    displayEmpty
                                >
                                    <MenuItem disabled value=''>
                                        <em>Choose a group</em>
                                    </MenuItem>
                                    {groupsMessage.map((group, index) => (
                                        <MenuItem key={index} value={group.id}>
                                            {group.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </label>
                        <br />
                        <Button color="darkBlue" variant="outlined" type="submit">Submit</Button>
                    </form>
                </Popover>
            </div>
            <div>
                <Stack direction="row" spacing={2} alignItems="center">
                    Add Transaction
                    <IconButton aria-describedby="addTransactionId" color="primary" onClick={null}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Stack>
            </div>
        </div>
    )
}