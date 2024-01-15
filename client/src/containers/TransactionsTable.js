import React, { useState, useEffect } from "react";
import { Stack, Button, IconButton, Popover, TextField } from '@mui/material';
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

export default function TransactionsTable(props) {
    // get all transactions from database
    const [transactionMessage, setTransactionMessage] = useState([]);
    const [checkboxSelection, setCheckboxSelection] = useState(true);
    const [newRow, setNewRow] = useState({
        merchant: "",
        account: "",
        date: "",
        amount: "",
        type: "",
        category: "",
    });

    // get account name from account id
    const getAccountName = async (accountId) => {
        try {
            const response = await fetch(`http://localhost:9000/accounts/get/${accountId}`);
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error(`Error fetching account details for account_id ${accountId}:`, error);
            return '';
        }
    }

    // get category name from category id
    const getCategoryName = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:9000/categories/get/${categoryId}`);
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error(`Error fetching category details for category_id ${categoryId}:`, error);
            return '';
        }
    }

    const editTransactionRow = async (transactionId) => {
        try {
            const response = await fetch(`http://localhost:9000/transactions/get/${transactionId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching transaction details for transaction_id ${transactionId}`);
            return '';
        }
    }

    const [transactionRows, setTransactionRows] = useState([]);

    useEffect(() => {
        // get all transactions
        fetch('http://localhost:9000/transactions/all')
            .then((res) => res.json())
            .then(async (data) => {
                // for each transaction, get the account and category name and set the transactionRows
                const getRows = await Promise.all(data.map(async (transaction) => {
                    const accountName = await getAccountName(transaction.account_id);
                    const categoryName = await getCategoryName(transaction.category_id);
                    return {
                        ...transaction,
                        account: accountName,
                        category: categoryName,
                        date: new Date(transaction.date).toISOString().split('T')[0],
                        amount: parseInt(transaction.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                    };
                }));
                setTransactionMessage(data);
                setTransactionRows(getRows);
            }).catch((error) => console.log(error));
    }, []);

    // const [accountMessage, setAccountMessage] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:9000/accounts/get/' + transaction.account_id)
    //         .then((res) => res.json())
    //         .then((data) => setAccountMessage(data))
    //         .catch((err) => console.log(err));
    // }, []);

    // const accountResponse = fetch('http://localhost:9000/accounts/get/' + transaction.account_id);
    // const accountData = accountResponse.json();
    // console.log("account data: " + accountMessage);

    //     return {
    //         ...transaction,
    //         // account: accountData.name,
    //         date: new Date(transaction.date).toISOString().split('T')[0],
    //         amount: parseInt(transaction.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    //     };
    // });

    const [rows, setRows] = useState(transactionRows);

    // value to determine if user is currently editing a row or not
    const [editingRow, setEditingRow] = useState(null);


    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleAddCLick = () => {
        const newId = rows.length + 1;
        const emptyRow = { id: newId, isNew: true, merchant: '', account: '', date: '', amount: '', type: '', category: '' };
        setRows([...rows, emptyRow]);
        setEditingRow(newId);
    }

    const handleEditClick = (id) => () => {
    };

    const handleSaveClick = (id) => () => {
    };

    const handleDeleteClick = (id, oldRows) => () => {
    };

    const handleCancelClick = (id) => () => {
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const columns = [
        { field: 'merchant', headerName: 'Merchant', flex: 1 },
        { field: 'account', headerName: 'Account', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            cellClassName: 'actions',
            getActions: ({ id }) => {
                // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                // if (isInEditMode) {
                //     return [
                //         <GridActionsCellItem
                //             icon={<SaveIcon />}
                //             label="Save"
                //             sx={{
                //                 color: 'primary.main',
                //             }}
                //             onClick={handleSaveClick(id)}
                //         />,
                //         <GridActionsCellItem
                //             icon={<CancelIcon />}
                //             label="Cancel"
                //             className="textPrimary"
                //             onClick={handleCancelClick(id)}
                //             color="inherit"
                //         />,
                //     ];
                // }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    // console.log("rows: " + rows);

    // function descendingComparator(a, b, orderBy) {
    //     if (b[orderBy] < a[orderBy]) {
    //         return -1;
    //     }
    //     if (b[orderBy] > a[orderBy]) {
    //         return 1;
    //     }
    //     return 0;
    // }

    // function getComparator(order, orderBy) {
    //     return order === 'desc'
    //         ? (a, b) => descendingComparator(a, b, orderBy)
    //         : (a, b) => -descendingComparator(a, b, orderBy);
    // }

    // function stableSort(array, comparator) {
    //     const stabilizedThis = array.map((el, index) => [el, index]);
    //     stabilizedThis.sort((a, b) => {
    //         const order = comparator(a[0], b[0]);
    //         if (order !== 0) {
    //             return order;
    //         }
    //         return a[1] - b[1];
    //     });
    //     return stabilizedThis.map((el) => el[0]);
    // }

    // const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    //     props;
    // const createSortHandler = (property) => (event) => {
    //     onRequestSort(event, property);
    // };

    // TransactionsTable.propTypes = {
    //     numSelected: PropTypes.number.isRequired,
    //     onRequestSort: PropTypes.func.isRequired,
    //     onSelectAllClick: PropTypes.func.isRequired,
    //     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    //     orderBy: PropTypes.string.isRequired,
    //     rowCount: PropTypes.number.isRequired,
    // };

    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            // const id = randomId();
            // setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
            // setRowModesModel((oldModel) => ({
            //     ...oldModel,
            //     [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
            // }));
        };

        return (
            <GridToolbarContainer>
                {/* <Button aria-describedby="addTransactionId" color="darkBlue" startIcon={<AddCircleOutlineIcon />} onClick={handleClick}>
                    Add record
                </Button> */}
            </GridToolbarContainer>
        );
    }

    return (
        <div>
            <DataGrid
                rows={transactionRows}
                columns={columns}
                editMode="row"
                checkboxSelection={checkboxSelection}
                disableRowSelectionOnClick
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'date', sort: 'desc' }],
                    },
                }}
                slots={{
                    noRowsOverlay: () => (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                            No rows in table
                        </Stack>
                    ),
                    noResultsOverlay: () => (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                            Local filter returns no result
                        </Stack>
                    )
                }}
            // columnBuffer={0}
            // autoPageSize
            // rowModesModel={rowModesModel}
            // onRowModesModelChange={handleRowModesModelChange}
            // onRowEditStop={handleRowEditStop}
            // processRowUpdate={processRowUpdate}
            // slots={{
            //     toolbar: EditToolbar,
            // }}
            // slotProps={{
            //     toolbar: { setRows, setRowModesModel },
            // }} 
            />
        </div>
    );
}