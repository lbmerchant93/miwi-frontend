import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PossibleRoutes } from '../../utils/constants';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../../shared/auth-context';
import LoginModal from '../LoginModal/LoginModal';
import { getAuth, signOut } from 'firebase/auth';
import MUIAppBar from '@mui/material/AppBar';
// import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Lotus from '../../images/Lotus.svg';
import { 
    ToolBar,
    ToolBarContainer,
    TitleLink,
    TitleText,
    LogoutLink
 } from './AppBar.styled';

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
        <MUIAppBar elevation={0} position="sticky" color="inherit">
            <ToolBar className="header" disableGutters>
                <ToolBarContainer py={1} px={2}>
                    <TitleLink to={`${PossibleRoutes.ROOT}`} className="title-link">
                        <img src={Lotus} alt="Lotus-flower" height={55} width={55} />
                        <TitleText variant="h1">MiWi</TitleText>
                        <img src={Lotus} alt="Lotus-flower" height={55} width={55} />
                    </TitleLink>
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
                                onClick={onListItemClick(() => navigate(`/profile/${user.email?.split('@')[0]}`))}>
                                    Profile
                            </MenuItem>
                            <LogoutLink to={`${PossibleRoutes.ROOT}`} className="logout-link">
                                <MenuItem 
                                    onClick={onListItemClick(() => signOut(auth))}>
                                        Log out
                                </MenuItem>
                            </LogoutLink>
                        </Menu>
                    </Box>   
                </ToolBarContainer>
            </ToolBar> 
        </MUIAppBar>
    );
};

export default AppBar;