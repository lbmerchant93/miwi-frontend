import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PossibleRoutes } from '../../utils/constants';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../../shared/auth-context';
import LoginModal from '../LoginModal/LoginModal';
import { getAuth, signOut } from 'firebase/auth';
import './AppBar.css'

const AppBar: React.FC = () => {
    const user = useContext(AuthContext);
    const auth = getAuth();
    const navigate = useNavigate();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
                    onClick={() => setIsLoginOpen(true)}
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
            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
                user={user} 
                auth={auth}
            />
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
                    onClick={onListItemClick(() => navigate(PossibleRoutes.JOURNAL_ENTRY_FORM))}>
                        New Journal Entry
                </MenuItem>
                <Link to={`${PossibleRoutes.ROOT}`} className="logout-link">
                    <MenuItem 
                        onClick={onListItemClick(() => signOut(auth))}>
                            Log out
                    </MenuItem>
                </Link>
            </Menu>
            </div>    
        </header>
    );
};

export default AppBar;