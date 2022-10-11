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
                <strong>Create An Account:</strong> Click the <i><strong>LOG IN</strong></i> button in the top right corner of the screen, then click the <i><strong>register</strong></i> button under the <i><strong>Login Form</strong></i> or select to sign in through your google account. The method in which you choose to create an account will be how you sign in to your account in the future. (I.e., if you register an account through the <i><strong>Create an account</strong></i> form, you will sign in using the sign in form, but if you register using your google account you will sign in using the <i><strong>SIGN IN WITH GOOGLE</strong></i> button)
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Login:</strong> If you already have an account with us, you can login through the <i><strong>Login Form</strong></i> if you created your account by registering with us originally or you can <i><strong>Sign In With Google</strong></i> if you created your account by signing in with your google account originally.
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Guest Account:</strong> (<i>Note: If you are using the Guest Account, you may run into issues due to someone else also using the Guest Account at the same time. The Guest Account is only to be used to explore app features and not to be used for Personal Information.</i>)
            </Typography>
            <Typography variant="body1" mb={2}>
                The features listed below require an account and to be logged in, or to be using the <i><strong>Guest Account</strong></i>. 
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Profile Page:</strong> The <i><strong>Profile</strong></i> tab you will direct you to your Profile page. Once your information is retrieved from the backend, you will first see your personal information including your <i><strong>Display Name</strong></i>, <i><strong>Expected Due Date</strong></i>, and <i><strong>Location</strong></i>. Below that is a section containing your goals for <i><strong>Water Intake</strong></i>, <i><strong>Protein Intake</strong></i>, <i><strong>Exercise</strong></i>, <i><strong>Kegels</strong></i>, and <i><strong>Garland Pose</strong></i>. These goals are assigned with default suggested values upon creating an account. You may update your profile by clicking on your personal information or a specific goal. When your updates have been successfully stored, a green success message will appear and you will be redirected back to your profile which will include your newly updated information. At the bottom of your profile, there is an option to delete your account. This can be done by clicking the <i><strong>Delete Account</strong></i> button and following the prompts. (<i>Note: this action is irreversible.</i>)
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Pagination:</strong> Your dashboard's <i><strong>Home</strong></i> page will display the 15 most recent journal entries you have created. If you have more than 15 entries, you can view older journal entries by clicking the <i><strong>next</strong></i> button at the bottom of the <i><strong>Home</strong></i> page. The <i><strong>back</strong></i> button will return you to more recent entries.
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Delete Journal Entry:</strong> If you select the <i><strong>delete</strong></i> button on a journal entry card, a warning modal will pop up asking if you are sure you would like to delete the selected journal entry because this action is irreversible. If you a certain you would like to delete the entry, click the <i><strong>YES, I'M SURE</strong></i> button. Once your entry is successfully delete the warning modal will close and your dashboard will update to exclude the deleted entry. The <i><strong>CANCEL</strong></i> button will return you to your dashboard without deleting the entry.
            </Typography>
            <Typography variant="body1" mb={2}>
                <strong>Update Journal Entry:</strong> If you select the <i><strong>edit</strong></i> button on a journal entry card, an <i><strong>Update Journal Entry</strong></i> form will pop up that looks like the <i><strong>Create Journal Entry</strong></i> form but will be repopulated with the information from the journal entry you selected. Make changes to the form and click the <i><strong>UPDATE</strong></i> button. Once your information has been successfully stored, a green success message will briefly flash to alert you of the successful changes and the form will close which will return you to your dashboard that will show your updated changes.  The <i><strong>CANCEL</strong></i> button will return you to your dashboard without updating the entry.
            </Typography>
        </Box>
    );
};

export default AppFeatures;