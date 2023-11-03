import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useLocation } from 'react-router-dom';
import { AdminJSON } from '../../asset/json/sidebarJSON'
import { Collapse } from '@mui/material';
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({ open, setOpen }) {
    const theme = useTheme();
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
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {AdminJSON.map((val, index) => (
                        <Link className="navLinks" to={val.path} onClick={() => handleNavClick(val.openMenu)} >
                            <ListItem key={val.path} disablePadding sx={{ display: 'block' }}>
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
                                        <span style={{ color: val.path == location.pathname ? "#FFF" : "" }} className="material-symbols-outlined">
                                            {val.icon}
                                        </span>
                                    </ListItemIcon>
                                    <ListItemText primary={val.name} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                            <Collapse sx={{ pl: "20px" }} in={childOpen == val.openMenu} timeout="auto" unmountOnExit>
                                {
                                    val.child && val.child.map(val => {
                                        return (
                                            <Link className="navLinks" to={val.path}>
                                                <List component="div" disablePadding>
                                                    <ListItem className={val.path == location.pathname ? "active" : ""}>
                                                        <ListItemIcon>
                                                            <span style={{ color: val.path == location.pathname ? "#FFF" : "" }} className="material-symbols-outlined">
                                                                {val.icon}
                                                            </span>
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
                <Divider />
            </Drawer>
            <DrawerHeader />
        </Box>
    );
}