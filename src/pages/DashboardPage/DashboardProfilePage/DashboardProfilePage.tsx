import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import './DashboardProfilePage.css'

const DashboardProfilePage = () => {
    return (
        <>
            <Button 
                variant="outlined" 
                onClick={() => console.log("go to edit")}
                startIcon={<EditIcon />}
                color="inherit"
            >
                Edit
            </Button>
        </>
        
    )
}

export default DashboardProfilePage