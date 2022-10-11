import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AppFeatures = () => {
    return (
        <Box px={3} mb={2}>
          <Typography variant="h4">
            App Features
          </Typography>
          <Typography variant="body1" mb={2}>
            The features mentioned below are defined for their intended application use and there for any clarity on how the app works.
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Login:</strong> If you already have an account with us, you can login through the <i><strong>Login Form</strong></i> if you created your account by registering with us originally or sign in through your google account if you created your account by signing in with your google account originally.
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Pagination:</strong> Your dashboard's <i><strong>Home</strong></i> page will display the 15 most recent journal entries you have created. If you have more than 15 entries, you can view older journal entries by clicking the <i><strong>next</strong></i> button at the bottom of the <i><strong>Home</strong></i> page. The <i><strong>back</strong></i> button will return you to more recent entries.
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Profile Information:</strong> If you click the <i><strong>Profile</strong></i> tab you will see options to add an <i><strong>Expected due date</strong></i>, <i><strong>Edit your account</strong></i>, or <i><strong>Delete your account</strong></i>. Select either the <i><strong>Add</strong></i> button next to <i><strong>Expected due date</strong></i> or the <i><strong>Edit</strong></i> button next to <i><strong>Edit your account</strong></i> in order to be direct to a form in which you can edit/update your profile. Once you’ve completed the form, click <i><strong>submit</strong></i> to submit your changes. When your updates have been successfully stored to your account, a green success message will appear and you will be redirected back to the previous profile view which will include your newly updated information.
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