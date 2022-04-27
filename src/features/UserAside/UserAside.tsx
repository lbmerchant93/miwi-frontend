import { useContext } from 'react';
import Box from '@mui/material/Box';
import { AuthContext } from '../../shared/auth-context';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import EditIcon from '@mui/icons-material/Edit';

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
            <Typography variant="h4">{user.displayName}</Typography>
            {user.expectedDueDate && (
                <>
                    <Typography variant="h6">Estimated due date:</Typography>
                    <Typography variant="h6">April 20th 2022</Typography>
                </>
            )}
            {/* <Button 
                variant="outlined" 
                onClick={() => console.log("go to edit")}
                startIcon={<EditIcon />}
                color="inherit"
            >
                Edit
            </Button> */}
        </Box>
    );
};

export default UserAside;