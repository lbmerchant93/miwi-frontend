import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PossibleRoutes } from '../../utils/constants';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import './AppBar.css'

const AppBar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);
    const onListItemClick = (callback: () => void) => {
        return () => {
            handleClose();
            callback();
        }
    };

    return (
        <header>
            <Link to={`${PossibleRoutes.ROOT}`} className="title-link">
                <h1 className="title">MiWi</h1>
            </Link>
            <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined"
                color="inherit"
            >
                <MenuIcon />
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {isLoggedIn && 
                <>
                    <MenuItem onClick={onListItemClick(() => navigate(PossibleRoutes.NEW_ENTRY_FORM))}>New Entry</MenuItem>
                    <MenuItem onClick={onListItemClick(() => navigate(PossibleRoutes.ALL_ENTRIES))}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </>}
                {!isLoggedIn &&
                <>
                    <MenuItem onClick={handleClose}>Login</MenuItem>
                </>
                }
            </Menu>
            </div>    
        </header>
    );
};

export default AppBar;