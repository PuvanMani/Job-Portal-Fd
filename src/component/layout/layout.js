import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
import AppliedCandidate from '../../pages/Applied Module/AppliedCandidate';

function Layout() {
    const [open, setOpen] = useState(false)

    return (
        <Grid container>
            <Grid md={2.8} lg={2} sx={{ position: "relative", display: { xs: "none", md: "block" } }}>
                <MiniDrawer open={open} setOpen={setOpen} />
            </Grid>
            <Grid item xs={12} md={9.2} lg={10} >
                <Grid container>
                    <Grid item xs={12}>
                        <Navbar open={open} setOpen={setOpen} />
                    </Grid>
                    <Grid item xs={12} sx={{ p: "20px", mt: "10px" }}>
                        <Routes>
                            <Route path="/dashboard" element={<MyDashboard />} />
                            <Route path="/company/view-company" element={<CompanyList />} />
                            <Route path="/company/add-company" element={<CompanyForm />} />
                            <Route path="/jobs/add-job" element={<Addjob />} />
                            <Route path="/jobs/view-job" element={<JobView />} />
                            <Route path="/profile/add-profile/create" element={<ProfileDetails />} />
                            <Route path="/profile/add-profile/:action" element={<ProfileDetails />} />
                            <Route path="/profile/view-profile" element={<ViewProfile />} />
                            <Route path="/apllied/view-aplliedcabdidate" element={<AppliedCandidate />} />
                            <Route path="/*" element={<Navigate to="/dashboard" />} />
                        </Routes>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default Layout
