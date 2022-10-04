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
import Typography from '@mui/material/Typography';
import MUIAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import './AppBar.css';

// const ElevationScroll: React.FC<{ children: React.ReactElement }> = props => {
//     const { children } = props;

//     const trigger = useScrollTrigger({
//         disableHysteresis: true,
//         threshold: 0,
//         target: window,
//     });

//     return React.cloneElement(children, {
//         style: {
//             boxShadow: trigger ? '0px 4px 7px -4px rgb(0 0 0 / 20%)' : 'none'
//         }
//     });
// };

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
        <>
            <MUIAppBar elevation={0} position="sticky" color="inherit">
                <Toolbar className='header'>
                    <Link to={`${PossibleRoutes.ROOT}`} className="title-link">
                        <Typography variant="h1" sx={{ fontSize: "3rem" }}>MiWi</Typography>
                    </Link>
                    <Box className={!user.isLoggedIn ? 'login-button' : 'user-menu'} display={'flex'} width={250} justifyContent={'flex-end'}>
                        {!user.isLoggedIn ? (
                            <Button
                                onClick={() => setIsLoginOpen(true)}
                                variant="outlined"
                                color="inherit"
                            >
                                Log In
                            </Button>
                        ) : (
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'} width={'100%'}>
                                <Button onClick={onListItemClick(() => navigate(`/home/${user.email?.split('@')[0]}`))}>
                                    <HomeIcon />
                                </Button>
                                <Divider orientation="vertical" />
                                <Button onClick={onListItemClick(() => navigate(`/journal/entries`))}>
                                    <MenuBookIcon />
                                </Button>
                                <Divider orientation="vertical" />
                                <Button
                                    id="menu-button"
                                    aria-controls={open ? 'menu-button' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    color="inherit"
                                    variant='outlined'
                                >
                                    <Avatar
                                        src={undefined}
                                        alt="User Photo"
                                        style={{ fontSize: '12px', height: 24, width: 24, marginRight: '8px' }}>
                                        {user.displayName?.toUpperCase()[0]}
                                    </Avatar>
                                    <MenuIcon />
                                </Button>
                            </Box>
                            
                        )}
                        <LoginModal 
                            isOpen={isLoginOpen} 
                            onClose={() => setIsLoginOpen(false)} 
                            auth={auth}
                            user={user}
                        />
                        <Menu
                            id="app-menu"
                            aria-labelledby="app-menu-button"
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
                                onClick={onListItemClick(() => navigate('/dashboard/journal_entry_form'))}>
                                    New Journal Entry
                            </MenuItem>
                            <MenuItem 
                                onClick={onListItemClick(() => navigate(`/profile/${user.email?.split('@')[0]}`))}>
                                    Profile
                            </MenuItem>
                            <Link to={`${PossibleRoutes.ROOT}`} className="logout-link">
                                <MenuItem 
                                    onClick={onListItemClick(() => signOut(auth))}>
                                        Log out
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>   
                </Toolbar> 
            </MUIAppBar>
        </>
    );
};

export default AppBar;