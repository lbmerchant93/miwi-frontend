import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ShareLink from '../../../features/ShareLink/ShareLink';

const AppFeatures = () => {
    return (
        <Box px={3} mb={2}>
            <Box mb={2} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link href="/how-miwi-works">
                        Help Center
                    </Link>
                    <Link underline="none">
                        App Features
                    </Link>
                </Breadcrumbs>
                <ShareLink />
            </Box>
            <Typography variant="h4" mb={2}>
                App Features
            </Typography>
            <Typography variant="body1" mb={2}>
                The features mentioned below are defined for their intended application use and there for clarity on how the app works.
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Account Creation:</strong> Click the <i><strong>LOG IN</strong></i> button in the top right corner of the screen, then click the <i><strong>Register</strong></i> button under the <i><strong>Login Form</strong></i> or select to sign in through your google account. The method in which you choose to create an account will be how you sign in to your account in the future. (I.e., if you register an account through the <i><strong>Create an account</strong></i> form, you will sign in using the sign in form, but if you register using your google account you will sign in using the <i><strong>SIGN IN WITH GOOGLE</strong></i> button)
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Login:</strong> If you already have an account with us, you can login through the <i><strong>Login Form</strong></i> if you created your account by registering with us originally or you can <i><strong>Sign In With Google</strong></i> if you created your account by signing in with your google account originally. Once you have logged in, you will be directed to today's journal entry.
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Guest Account:</strong> If you would like to just explore MiWi, and see some of its features first hand before creating an account, you can click the <i><strong>Sign In As Guest</strong></i> button on the login modal. (<i>Note: If you are using the Guest Account, you may run into issues due to someone else also using the Guest Account at the same time. The Guest Account is only to be used to explore app features and not to be used for Personal Information.</i>)
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Journal Entry:</strong> To update a journal entry, you need to select the section you're wanting to update which will open a modal for you to perform your input. You can submit your updates by clicking the <i><strong>Update</strong></i> button. If you wish to delete a journal entry, click the <i><strong>Delete Entry</strong></i> at the bottom of the journal entry page. (<i>Note: Deleting a journal entry is irreversible.</i>)
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Profile Page:</strong> The <i><strong>Profile</strong></i> tab you will direct you to your Profile page. Once your information is retrieved from the backend, you will first see your personal information including your <i><strong>Display Name</strong></i>, <i><strong>Expected Due Date</strong></i>, and <i><strong>Location</strong></i>. Below that is a section containing your goals for <i><strong>Water Intake</strong></i>, <i><strong>Protein Intake</strong></i>, <i><strong>Exercise</strong></i>, <i><strong>Kegels</strong></i>, and <i><strong>Garland Pose</strong></i>. These goals are assigned with default suggested values upon creating an account. You may update your profile by clicking on your personal information or a specific goal. When your updates have been successfully stored, a green success message will appear and you will be redirected back to your profile which will include your newly updated information. At the bottom of your profile, there is an option to delete your account. This can be done by clicking the <i><strong>Delete Account</strong></i> button and following the prompts. (<i>Note: this action is irreversible.</i>)
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Pagination:</strong> Your <i><strong>Journal</strong></i> page will display the 15 most recent journal entries you have created. If you have more than 15 entries, you can view older journal entries by clicking the <i><strong>next</strong></i> button at the bottom of the <i><strong>Journal</strong></i> page. The <i><strong>back</strong></i> button will return you to more recent entries.
            </Typography>
        </Box>
    );
};

export default AppFeatures;