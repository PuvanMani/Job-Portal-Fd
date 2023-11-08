import React, { useEffect, useState } from 'react';
import { Box, Dialog, FormLabel, TextField } from '@mui/material';
import { BaseURL } from '../../config/AxiosConfig';
import Datatable from '../../component/table/datatable';

function MyDashboard() {
    const [userData, setuserData] = useState([])
    const [open, setopen] = useState(false)
    const [updateData, setupdateData] = useState({
        fname: "",
        lname: "",
        email: ""
    })
    const columns = [
        {
            field: 'fname',
            headerName: 'First name',
            sortable: false,
        },
        {
            field: 'lname',
            headerName: 'Last name',
        },
        {
            field: 'email',
            headerName: 'Email',
        },
        {
            field: 'role',
            headerName: 'Role',
        }
    ];
    const ListUserData = () => {
        if (localStorage.getItem("role") == "Admin") {
            BaseURL.get('user/list').then((res) => {
                if (res.data.message) {
                    setuserData([...res.data.message])
                } else {
                    alert(res.data.message)
                }
            })
        } else {
            BaseURL.get(`/user/listbyid/${localStorage.getItem("userid")}`).then((res) => {
                if (res.data.message) {
                    setuserData([...res.data.message])
                } else {
                    alert(res.data.message)
                }
            })
        }

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
            <div class="row g-6 mb-6">
                <div class="col-xl-3 col-sm-6 col-12">
                    <div class="card shadow border-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <span class="h6 font-semibold text-muted text-sm d-block mb-2">Today Jobs</span>
                                    <span class="h3 font-bold mb-0">12</span>
                                </div>
                                <div class="col-auto">
                                    <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                        <i class="bi bi-briefcase"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 mb-0 text-sm">
                                <span class="badge badge-pill bg-soft-success text-success me-2">
                                    <i class="bi bi-arrow-up me-1"></i>13%
                                </span>
                                <span class="text-nowrap text-xs text-muted">Since last month</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 col-12">
                    <div class="card shadow border-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <span class="h6 font-semibold text-muted text-sm d-block mb-2">New users</span>
                                    <span class="h3 font-bold mb-0">215</span>
                                </div>
                                <div class="col-auto">
                                    <div class="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                        <i class="bi bi-people"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 mb-0 text-sm">
                                <span class="badge badge-pill bg-soft-success text-success me-2">
                                    <i class="bi bi-arrow-up me-1"></i>30%
                                </span>
                                <span class="text-nowrap text-xs text-muted">Since last month</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 col-12">
                    <div class="card shadow border-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <span class="h6 font-semibold text-muted text-sm d-block mb-2">Total company</span>
                                    <span class="h3 font-bold mb-0">186</span>
                                </div>
                                <div class="col-auto">
                                    <div class="icon icon-shape bg-info text-white text-lg rounded-circle">
                                        <i class="bi bi-building"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 mb-0 text-sm">
                                <span class="badge badge-pill bg-soft-danger text-danger me-2">
                                    <i class="bi bi-arrow-down me-1"></i>-5%
                                </span>
                                <span class="text-nowrap text-xs text-muted">Since last month</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 col-12">
                    <div class="card shadow border-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <span class="h6 font-semibold text-muted text-sm d-block mb-2">Total Jobs</span>
                                    <span class="h3 font-bold mb-0">256</span>
                                </div>
                                <div class="col-auto">
                                    <div class="icon icon-shape bg-warning text-white text-lg rounded-circle">
                                        <i class="bi bi-briefcase"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 mb-0 text-sm">
                                <span class="badge badge-pill bg-soft-success text-success me-2">
                                    <i class="bi bi-arrow-up me-1"></i>10%
                                </span>
                                <span class="text-nowrap text-xs text-muted">Since last month</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Datatable rows={userData} columns={columns} EditFunc={handleEdit} DeleteFunct={handleDelete} Delete={localStorage.getItem("role") == "Admin" ? false : true} id="user_id" />
            <Dialog open={open} maxWidth="md">
                <Box sx={{ p: 3 }}>
                    <h3 style={{ padding: 0, margin: 0 }}>User Details</h3>
                    <FormLabel>First Name</FormLabel>
                    <TextField sx={{ mb: "10px" }} value={updateData["fname"]} onChange={(e) => setupdateData({ ...updateData, fname: e.target.value })} variant='outlined' fullWidth size='small' placeholder='Name' />
                    <FormLabel>Last Name</FormLabel>
                    <TextField sx={{ mb: "10px" }} value={updateData["lname"]} onChange={(e) => setupdateData({ ...updateData, lname: e.target.value })} variant='outlined' fullWidth size='small' placeholder='Name' />
                    <FormLabel>Email</FormLabel>
                    <TextField sx={{ mb: "10px" }} value={updateData["email"]} disabled variant='outlined' fullWidth size='small' placeholder='Name' />
                    <div style={{ textAlign: "right" }}>
                        <button style={{ padding: "5px 10px", marginRight: "10px", mr: "10px" }} variant='outlined' className='btn btn-danger' disableElevation onClick={() => setopen(false)}>Close</button>
                        <button style={{ padding: "5px 10px" }} variant='contained' className='btn btn-primary' disableElevation onClick={handleUpdate}>Update</button>
                    </div>
                </Box>
            </Dialog>
        </Box>
    )
}

export default MyDashboard;
