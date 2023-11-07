import { Grid } from '@mui/material';
import React, { useState } from 'react';
import Navbar from '../menubar/navbar';
import MiniDrawer from '../sidebar/sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import CompanyList from '../../pages/company/ListCompany';
import CompanyForm from '../../pages/company/companyForm';
import JobView from '../../pages/Job Moduel/JobList';
import Addjob from '../../pages/Job Moduel/JobForm';
import MyDashboard from '../../pages/dashboad/Dashboard';
import ProfileDetails from '../../pages/Recuritement Module/ProfileDetails';
import { ViewProfile } from '../../pages/Recuritement Module/ViewProfile';

function Layout() {
    const [open, setOpen] = useState(false)
    return (
        <Grid container>
            <Grid item xs={2}>
                <MiniDrawer open={open} setOpen={setOpen} />
                <Navbar open={open} setOpen={setOpen} />
            </Grid>
            <Grid item xs={open ? 10 : 12} sx={{ p: "25px", mt: open ? "60px" : "" }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Routes>
                            <Route path="/dashboard" element={<MyDashboard />} />
                            <Route path="/company/view-company" element={<CompanyList />} />
                            <Route path="/company/add-company" element={<CompanyForm />} />
                            <Route path="/jobs/add-job" element={<Addjob />} />
                            <Route path="/jobs/view-job" element={<JobView />} />
                            <Route path="/profile/add-profile/create" element={<ProfileDetails />} />
                            <Route path="/profile/add-profile/:action" element={<ProfileDetails />} />
                            <Route path="/profile/view-profile" element={<ViewProfile />} />
                            <Route path="/*" element={<Navigate to="/dashboard" />} />
                        </Routes>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Layout
