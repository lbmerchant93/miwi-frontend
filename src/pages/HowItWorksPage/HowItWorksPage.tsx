import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './HowItWorksPage.css';

const HowItWorksPage = () => {
  return (
    <Box className='hiw-page-container'>
        <Typography variant='h2'><strong>How MiWi works</strong></Typography>
        <Box className='hiw-page-journal-terms-section-container' mt={4}>
          <Typography variant="h4">Journal entry terms</Typography>
        </Box>
        <Box className='hiw-page-journal-terms-section'>
          <Typography variant="body1" mb={2}>The terms for completing journal entries are defined below along with goal recommendations for each section of a journal entry. Refer to this section if there is any confusion in completing your journal entries. </Typography>
          <Typography variant="body1" mb={2}><strong>Water Intake:</strong> You need 1/2 your weight in ounces of water per day minimum. (Ex: A 200 lb person needs 100 oz of water per day. A 150 lb person needs 75 oz of water per day.) So as you and your baby grow, your water intake grows!</Typography>
          <Typography variant="body1" mb={2}><strong>Protein:</strong> You should strive for 70 grams of protein per day. When you have any sugar, whether it's a good sugar like fruit or a bad/rarely had sugar like a cookie, always couple the serving of sugar with a serving of protein to help stabilize your glycemic index.</Typography>
          <Typography variant="body1" mb={2}><strong>Exercise:</strong> You should strive for 30+ minutes of low-impact, sweat-inducing, cardiovascular exercise at least 4x's per week.</Typography>
          <Typography variant="body1" mb={2}><strong>Kegels:</strong> To help boost your pelvic floor strength, perform 25 repetitions of kegels 4x's per day.</Typography>
          <Typography variant="body1" mb={2}><strong>Garland Pose:</strong> To help boost your pelvic floor strength, perform a garland pose (also known as a flat-footed squat) for a total of 10 minutes per day.</Typography>
          <Typography variant="body1" mb={2}><strong>Prenatal Vitamins:</strong> Choose a high quality (preferably food-based) prenatal vitamin to be taken daily. Be sure it has folate instead of folic acid. D3-K2 helps to boost the immune system. DHA is essential for brain development.</Typography>
          <Typography variant="body1" mb={2}><strong>Probiotics:</strong> Choose a probiotic that has Lactobacillus Reuteri and Lactobacillus Rhamnosus, to be taken daily. Those two strands target the reproductive flora as well as the gut flora.</Typography>
        </Box>
    </Box>
  )
}

export default HowItWorksPage