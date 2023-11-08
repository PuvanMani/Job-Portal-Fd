import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import { AdminJSON, EmployeeJSON, RecruiterJSON } from '../../asset/json/sidebarJSON'
import { Collapse, Drawer } from '@mui/material';
import brand from '../../asset/image/logo.png'




const drawerWidth = 240;


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


export default function MiniDrawer({ open, setOpen }) {
    const location = useLocation()
    const [childOpen, setchildOpen] = useState("");

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleNavClick = (openMenu) => {
        setchildOpen(childOpen == openMenu ? "" : openMenu)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer sx={{
                width: drawerWidth,
                display: { xs: 'block', md: 'none' },
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,

                    boxSizing: 'border-box',
                },
            }}
                variant="presentation"
                anchor="left"
                onClose={() => setOpen(false)}
                open={open}>
                <DrawerHeader>
                    <Toolbar sx={{ p: 1 }}>
                        <img src={brand} alt='Brand' width="90%" />
                    </Toolbar>
                    <IconButton sx={{ backgroundColor: "#ADD8E6", p: "1px 7px 0px 7px" }} onClick={handleDrawerClose}>
                        <i class="bi bi-x"></i>
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {(localStorage.getItem("role") == "Admin" ? AdminJSON : localStorage.getItem("role") == "Recruiter" ? RecruiterJSON : EmployeeJSON).map((val, index) => (
                        <Link key={index} className="navLinks" to={val.path} onClick={() => handleNavClick(val.openMenu)} >
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    className={val.path == location.pathname ? "active" : ""}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        mb: 1
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <i className={val.icon}></i>
                                    </ListItemIcon>
                                    <ListItemText primary={val.name} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                            <Collapse sx={{ pl: "20px" }} in={childOpen == val.openMenu} timeout="auto" unmountOnExit>
                                {
                                    val.child && val.child.map((val, ind) => {
                                        return (
                                            <Link key={ind} className="navLinks" to={val.path}>
                                                <List component="div" disablePadding>
                                                    <ListItem className={val.path == location.pathname ? "active" : ""}>
                                                        <ListItemIcon>
                                                            <i className={val.icon}></i>
                                                        </ListItemIcon>
                                                        <ListItemText sx={{ pl: "10px" }} primary={val.name} />
                                                    </ListItem>
                                                </List>
                                            </Link>
                                        )
                                    })
                                }
                            </Collapse>
                        </Link>
                    ))}
                </List>
            </Drawer>
            <DrawerHeader />



            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "100%", position: "absolute", minHeight: "100vh" },
                }}
                open={true}
            >
                <DrawerHeader>
                    <Toolbar sx={{ p: 1 }}>
                        <img src={brand} alt='Brand' width="90%" />
                    </Toolbar>

                </DrawerHeader>
                <Divider />
                <List>
                    {(localStorage.getItem("role") == "Admin" ? AdminJSON : localStorage.getItem("role") == "Recruiter" ? RecruiterJSON : EmployeeJSON).map((val, index) => (
                        <Link key={index} className="navLinks" to={val.path} onClick={() => handleNavClick(val.openMenu)} >
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    className={val.path == location.pathname ? "active" : ""}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        mb: 1
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: 3,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <i className={val.icon}></i>
                                    </ListItemIcon>
                                    <ListItemText primary={val.name} />
                                </ListItemButton>
                            </ListItem>
                            <Collapse sx={{ pl: "20px" }} in={childOpen == val.openMenu} timeout="auto" unmountOnExit>
                                {
                                    val.child && val.child.map((val, ind) => {
                                        return (
                                            <Link key={ind} className="navLinks" to={val.path}>
                                                <List component="div" disablePadding>
                                                    <ListItem className={val.path == location.pathname ? "active" : ""}>
                                                        <ListItemIcon>
                                                            <i className={val.icon}></i>
                                                        </ListItemIcon>
                                                        <ListItemText sx={{ pl: "10px" }} primary={val.name} />
                                                    </ListItem>
                                                </List>
                                            </Link>
                                        )
                                    })
                                }
                            </Collapse>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}