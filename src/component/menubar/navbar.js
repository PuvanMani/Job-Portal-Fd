import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function Navbar({ open, setOpen }) {
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <AppBar position="fixed" open={open} elevation={1} sx={{ backgroundColor: "white", color: "black" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Hii, Puvan Mani !
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
