import { React, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { RiAccountCircleFill } from 'react-icons/ri';
import { IoNotifications } from 'react-icons/io5';
import Main from './Main.js';
import Transactions from './Transactions.js';
import Stats from './Stats.js';
import Account from './Account.js';
import Settings from './Settings.js';

import {
    Drawer, AppBar, Box, CssBaseline, Divider, List, ListItem,
    ListItemButton, ListItemText, Toolbar, IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import headerImage from '../images/logo-color.png';

export default function Header() {
    const drawerWidth = 240;
    const navigate = useNavigate();

    // State to track the selected component
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleButtonClick = (path) => {
        // Check if the selected component is already the one being clicked
        navigate(path);
        if (selectedComponent !== path) {
            setSelectedComponent(path);
        }
    };

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                <h1>Tracker</h1>
                {/* <Link to="/" className="normal-case text-xl"><img style={{ height: "30px" }} src={headerImage}></img></Link> */}
            </Toolbar>
            <Divider />
            <List>
                <ListItem key="Dashboard" disablePadding>
                    <ListItemButton onClick={() => handleButtonClick('/')}>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="Transactions" disablePadding>
                    <ListItemButton onClick={() => handleButtonClick('/Transactions')}>
                        <ListItemText primary="Transactions" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="Stats" disablePadding>
                    <ListItemButton onClick={() => handleButtonClick('/Stats')}>
                        <ListItemText primary="Stats" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key="Account" disablePadding>
                    <ListItemButton onClick={() => handleButtonClick('/Account')}>
                        <ListItemText primary="Account" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="Settings" disablePadding>
                    <ListItemButton onClick={() => handleButtonClick('/Settings')}>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                {/* <CssBaseline /> */}
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        PaperProps={{
                            sx: {
                                bgcolor: "primary.main"
                            }
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        PaperProps={{
                            sx: {
                                bgcolor: "primary.main"
                            }
                        }}
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                    <Toolbar />
                    <div>
                        {/* Use Routes to render only the first matching route */}
                        <Routes>
                            <Route exact path="/" element={<Main />} />
                            <Route exact path="/Transactions" element={<Transactions />} />
                            <Route exact path="/Stats" element={<Stats />} />
                            <Route exact path="/Account" element={<Account />} />
                            <Route exact path="/Settings" element={<Settings />} />
                        </Routes>
                    </div>
                </Box>
            </Box>
        </div>
    )
}