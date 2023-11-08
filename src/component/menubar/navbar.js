import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function Navbar({ open, setOpen }) {
    const navigate = useNavigate()
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const Open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = () => {
        setAnchorEl(null);
        localStorage.clear()
        navigate('/auth/login')
    };

    return (
        <div>
            <AppBar position="static" open={open} elevation={2} sx={{ color: "black", backgroundColor: "white" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ display: { xs: "flex", md: "none" } }}
                            onClick={handleDrawerOpen}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Hii, {localStorage.getItem('name')} !
                        </Typography>
                    </div>
                    <div>
                        {
                            localStorage.getItem("userid") ? <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" onClick={handleClick} style={{ width: "40px", cursor: "pointer" }} alt="Avatar" />
                                :
                                <>
                                    <button className='btn' style={{ padding: "5px 10px", marginRight: "10px" }}> Login</button>
                                    <button className='btn btn-primary' style={{ padding: "5px 10px" }}> Sign in</button>
                                </>
                        }

                    </div>
                </Toolbar>
                <Menu
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 20,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                </Menu>
            </AppBar>
        </div>
    )
}

export default Navbar
