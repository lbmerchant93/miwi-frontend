import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const FirstTimeAppFlow = () => {
    return (
        <Box px={3}>
            <Box mb={2}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link href="/how-miwi-works">
                        Help Center
                    </Link>
                    <Link underline="none">
                        First Time App Flow
                    </Link>
                </Breadcrumbs>
            </Box>
            <Typography variant="h4" mb={2}>
                First Time App Flow
            </Typography>
            <Typography variant="body1" mb={2}>
                Listed below are the steps in order to create an account and then how to create your first Journal Entry.
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Step 1:</strong> You can create an account by clicking the <i><strong>register</strong></i> button under the <i><strong>Login Form</strong></i> or by selecting to sign in through your google account. The method in which you choose to create an account will be how you sign in to your account in the future. (I.e., if you register an account through the <i><strong>Create an account</strong></i> form, you will sign in using the sign in form, but if you register using your google account you will sign in using the <i><strong>SIGN IN WITH GOOGLE</strong></i> button)
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Step 2:</strong> Once you have successfully created your account, you will be directed to your dashboard's <i><strong>Home</strong></i> page. Since you will not have any journal entries yet, a message will appear with a button prompting you to create your first journal entry. Clicking this button will direct you to the Journal Entry Form page, or you can get there by selecting the <i><strong>Journal Entry Form</strong></i> tab.
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Step 3:</strong> Fill out the journal entry form with your information for the date you select. Once you have completed the form, click the <i><strong>submit</strong></i> button which will submit your information to be stored in our database. The form will prompt you if a field is required in order to be submitted. Remember that its 100% OK not to check off everything every single day! The requirements for these inputs are there to assist you in case you happen to miss one. It is totally OK to enter “0”, “false”, or “not today” for any of the inputs that you took a grace day on! 
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Step 4:</strong> Once you have submitted your journal entry and it has successfully been stored in the database, you will receive a green success message at the top of the screen. You will automatically be directed back to your dashboard’s <i><strong>Home</strong></i> page. It may take a few seconds as we retrieve your entry from the database but the information you submitted will appear shortly inside a journal entry card. This card shows the break down of the information for that day along with a pencil icon button, used for updating the journal entry, and a trash can icon button, used for deleting the journal entry entirely. 
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Congrats! You just created your first journal entry! See the App Features section to see what else you can do with MiWi!</strong> 
            </Typography>
        </Box>
    );
};

export default FirstTimeAppFlow;