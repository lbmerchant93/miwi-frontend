import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

import './HowMiWiWorksPage.css';

const HowItWorksPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box className='hiw-page-container'>
        <Typography variant='h2'>
          <strong>How MiWi works</strong>
        </Typography>
        <Box className='hiw-page-app-flow-section-title-container' mt={4}>
          <Typography variant="h4">
            First Time App Flow
          </Typography>
        </Box>
        <Box className='hiw-page-app-flow-section-container'>
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
        <Box className='hiw-page-app-features-section-title-container' mt={4}>
          <Typography variant="h4">
            App Features
          </Typography>
        </Box>
        <Box className='hiw-page-app-features-section-container'>
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
        <Box className='hiw-page-journal-terms-section-title-container' mt={4}>
          <Typography variant="h4">
            Journal Entry Terms
          </Typography>
        </Box>
        <Box className='hiw-page-journal-terms-section-container'>
          <Typography variant="body1" mb={2}>
            The terms for completing journal entries are defined below along with goal recommendations for each section of a journal entry. Refer to this section if there is any confusion in completing your journal entries. 
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Water Intake:</strong> You need 1/2 your weight in ounces of water per day minimum. (Ex: A 200 lb person needs 100 oz of water per day. A 150 lb person needs 75 oz of water per day.) So as you and your baby grow, your water intake grows!
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Protein:</strong> You should strive for 70 grams of protein per day. When you have any sugar, whether it's a good sugar like fruit or a bad/rarely had sugar like a cookie, always couple the serving of sugar with a serving of protein to help stabilize your glycemic index.
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Exercise:</strong> You should strive for 30+ minutes of low-impact, sweat-inducing, cardiovascular exercise at least 4x's per week.
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Kegels:</strong> To help boost your pelvic floor strength, perform 25 repetitions of kegels 4x's per day.
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Garland Pose:</strong> To help boost your pelvic floor strength, perform a garland pose (also known as a flat-footed squat) for a total of 10 minutes per day.
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Prenatal Vitamins:</strong> Choose a high quality (preferably food-based) prenatal vitamin to be taken daily. Be sure it has folate instead of folic acid. D3-K2 helps to boost the immune system. DHA is essential for brain development.
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Probiotics:</strong> Choose a probiotic that has Lactobacillus Reuteri and Lactobacillus Rhamnosus, to be taken daily. Those two strands target the reproductive flora as well as the gut flora.
          </Typography>
        </Box>
    </Box>
  )
}

export default HowItWorksPage