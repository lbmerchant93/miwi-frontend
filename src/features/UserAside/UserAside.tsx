import { useContext } from 'react';
import Box from '@mui/material/Box';
import { AuthContext } from '../../shared/auth-context';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import './UserAside.css';

const UserAside = () => {
    const user = useContext(AuthContext);

    return (
        <Box className="user-aside-container">
            <Avatar
                src={user.photoURL ?? undefined}
                alt="User Photo"
                style={{ fontSize: '100px', height: 200, width: 200, marginRight: '8px' }}>
                {user.displayName?.toUpperCase()[0]}
            </Avatar>
            <Typography variant="h5">{user.displayName}</Typography>
        </Box>
    );
};

export default UserAside;