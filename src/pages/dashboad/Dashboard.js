import React, { useEffect, useState } from 'react';
import MyDataGrid from '../../component/table/datagrid';
import { Box, Button, Dialog, FormLabel, IconButton, TextField, Tooltip } from '@mui/material';
import { BaseURL } from '../../config/AxiosConfig'
function Dashboard() {
    const [userData, setuserData] = useState([])
    const [open, setopen] = useState(false)
    const [updateData, setupdateData] = useState({
        fname: "",
        lname: "",
        email: ""
    })
    const columns = [
        {
            field: 'user_id',
            headerName: 'User ID',
            width: 150,
        },
        {
            field: 'fname',
            headerName: 'Full name',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.fname || ''} ${params.row.lname || ''}`,
        },
        {
            field: 'lname',
            headerName: 'Last name',
            width: 150,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 200,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.id)}>
                        <Tooltip title="Edit" arrow>
                            <span style={{ color: "blue" }} className="material-symbols-outlined">
                                edit_note
                            </span>
                        </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.id)}>
                        <Tooltip title="Delete" arrow>
                            <span style={{ color: "red" }} className="material-symbols-outlined">
                                delete
                            </span>
                        </Tooltip>
                    </IconButton>
                </>
            ),
        },
    ];
    const ListUserData = () => {
        BaseURL.get('user/list').then((res) => {
            if (res.data.message) {
                setuserData([...res.data.message])
            } else {
                alert(res.data.message)
            }
        })
    }
    const handleDelete = async (userid) => {
        BaseURL.delete(`/user/delete/${userid}`).then(res => {
            if (res.data.status) {
                ListUserData()
            } else {
                alert(res.data.message)
            }
        })
    }
    const handleEdit = (userid) => {
        const data = userData.find(val => val.user_id == userid);
        setupdateData({ ...updateData, fname: data.fname, lname: data.lname, email: data.email })
        setopen(true)
    }
    const handleUpdate = () => {
        delete updateData.email
        BaseURL.put(`/user/update`, updateData).then(res => {
            if (res.data.status) {
                setopen(false);
                ListUserData();
            } else {
                alert(res.data.message)
            }
        })
    }
    useEffect(() => {
        ListUserData()
    }, [])
    return (
        <Box>
            <h2>Dashboard</h2>
            <MyDataGrid rows={userData} columns={columns} id="user_id" />
            <Dialog open={open} maxWidth="md">
                <Box sx={{ p: 3 }}>
                    <h3 style={{ padding: 0, margin: 0 }}>User Details</h3>
                    <FormLabel>First Name</FormLabel>
                    <TextField sx={{ mb: "10px" }} value={updateData["fname"]} onChange={(e) => setupdateData({ ...updateData, fname: e.target.value })} variant='outlined' fullWidth size='small' placeholder='Name' />
                    <FormLabel>Last Name</FormLabel>
                    <TextField sx={{ mb: "10px" }} value={updateData["lname"]} onChange={(e) => setupdateData({ ...updateData, lname: e.target.value })} variant='outlined' fullWidth size='small' placeholder='Name' />
                    <FormLabel>Email</FormLabel>
                    <TextField sx={{ mb: "10px" }} value={updateData["email"]} disabled variant='outlined' fullWidth size='small' placeholder='Name' />
                    <Button variant='outlined' sx={{ mr: "10px" }} disableElevation onClick={() => setopen(false)}>Close</Button>
                    <Button variant='contained' disableElevation onClick={handleUpdate}>Update</Button>
                </Box>
            </Dialog>
        </Box>
    )
}

export default Dashboard;
