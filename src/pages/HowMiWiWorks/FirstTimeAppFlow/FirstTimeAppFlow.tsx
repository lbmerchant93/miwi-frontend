import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ShareLink from '../../../features/ShareLink/ShareLink';

const FirstTimeAppFlow = () => {
    return (
        <Box px={3}>
            <Box mb={2} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link href="/how-miwi-works">
                        Help Center
                    </Link>
                    <Link underline="none">
                        First Time App Flow
                    </Link>
                </Breadcrumbs>
                <ShareLink />
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
                <strong>Step 2:</strong> Once you have successfully created your account, you will be directed to today's journal entry. Before starting today's journal entry, we suggest you go to your Profile to change your goals if they differ from the preset example goals. You can get to your <i><strong>Profile Page</strong></i> by selecting the Profile tab on the now visible user menu.
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Step 3:</strong> To update your goals, select the goal you wish to change and input your new goal on the modal that opens. Once you've got your desired goals, click the <i><strong>Home Icon</strong></i> to be navigated back to today's journal entry.
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Step 4:</strong> To update your journal entry, select the section you wish to change and input your info on the modal that opens. Once your changes have been successfully updated, you will receive a green notification and be directed back to the journal entry, where your updates will be visible.
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Congrats! You just set up your profile and created your first journal entry! See the App Features section to see what else you can do with MiWi!</strong> 
            </Typography>
        </Box>
    );
};

export default FirstTimeAppFlow;