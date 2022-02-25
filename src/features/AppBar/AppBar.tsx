import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PossibleRoutes } from '../../utils/constants';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../../shared/auth-context';
import './AppBar.css'

const AppBar: React.FC = () => {
    const user = useContext(AuthContext);
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
            {!user.isLoggedIn ? (
                <Button
                    onClick={user.login}
                    variant="outlined"
                    color="inherit"
                >
                    Log In
                </Button>
            ) : (
                <Button
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant="outlined"
                    color="inherit"
                >
                    <Avatar
                        src={user.photoURL ?? undefined}
                        alt="User Photo"
                        style={{ fontSize: '12px', height: 24, width: 24, marginRight: '8px' }}>
                        {user.displayName?.toUpperCase()[0]}
                    </Avatar>
                    <MenuIcon />
                </Button>
            )}
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
                <MenuItem 
                    onClick={onListItemClick(() => navigate(PossibleRoutes.DASHBOARD))}>
                        My Dashboard
                </MenuItem>
                <MenuItem 
                    onClick={onListItemClick(() => navigate(PossibleRoutes.NEW_ENTRY_FORM))}>
                        New Journal Entry
                </MenuItem>
                <MenuItem 
                    onClick={onListItemClick(() => user.logout())}>
                        <Link to={`${PossibleRoutes.ROOT}`} className="logout-link">Log out</Link>
                </MenuItem>
            </Menu>
            </div>    
        </header>
    );
};

export default AppBar;