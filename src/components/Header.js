import React, { useState } from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { IconContext } from "react-icons";
import { FaEarlybirds } from "react-icons/fa";

const Header = () => {
    const [open, setOpen] = useState(false);

    const renderIcon = () => (
        <IconContext.Provider value={{ size: '2.5em', color: '#fff', style: { paddingRight: '8px' } }}>
            <FaEarlybirds />
        </IconContext.Provider>
    );

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const renderDrawer = () => {
        const drawerWidth = 300;
        return (
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                      width: drawerWidth,
                      boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Box p={0.5}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography variant="h6" color="inherit" component="h6">
                                API de Referencia
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleDrawerClose}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                <Grid p={1}>
                    <div className="mb-15">
                        <Typography color="inherit" component="p">
                            🇨🇱 Chilean Birds 🐦 : API con información sobre Aves de Chile usando datos de Buscaves.cl.
                        </Typography>
                    </div>
                    <div className="mb-15">
                        <Button variant="outlined" target="_blank" href="http://buscaves.cl/">Buscaves.cl</Button>
                    </div>
                    <div>
                        <Button variant="outlined" target="_blank" href="https://aves.ninjas.cl/api/birds">LINK API</Button>
                    </div>
                </Grid>
            </Drawer>
        );
    };

    return (
        <Box className='Header'>
            <AppBar position="static" color="primary" enableColorOnDark>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" className='header-logo'>
                        {renderIcon()}
                        <h2 className='nunito-400 color-white'>Aves de Chile</h2>
                    </Link>
                </Toolbar>
                {renderDrawer()}
            </AppBar>
        </Box>
    );
};

export default Header;