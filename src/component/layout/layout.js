import { Grid } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../menubar/navbar'
import MiniDrawer from '../sidebar/sidebar'
import Dashboard from '../../pages/dashboad/dashboard'
import { Login } from '@mui/icons-material'
import { Route, Routes } from 'react-router-dom'

function Layout() {
    const [open, setOpen] = useState(false)
    return (
        <Grid container>
            <Grid item xs={2}>
                <MiniDrawer open={open} setOpen={setOpen} />
                <Navbar open={open} setOpen={setOpen} />
            </Grid>
            <Grid item xs={open ? 10 : 12} sx={{ ml: open ? "270px" : "100px", mr: "30px" }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/auth/login" element={<Login />} />
                        </Routes>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Layout
