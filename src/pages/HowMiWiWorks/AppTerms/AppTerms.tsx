import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ShareLink from '../../../features/ShareLink/ShareLink';

const AppTerms = () => {
    return (
        <Box px={3} mb={2}>
            <Box mb={2} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link href="/how-miwi-works">
                        Help Center
                    </Link>
                    <Link underline="none">
                        App Terms
                    </Link>
                </Breadcrumbs>
                <ShareLink />
            </Box>
          <Typography variant="h4" mb={2}>
            App Terms
          </Typography>
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
          <Typography variant="body1" mb={2}>
            <strong>Mood:</strong> Choose the answer that best represents how you felt about you day today as a whole. 
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Childbirth Education:</strong> What are you reading, learning, or listening to today to give you the most empowering birth possible? Search for classes that are not associated with the facility you're delivering in. Sure, those may be cheaper, but with hospitals, they are often classes to show you how to be a “good patient” and fit through their assembly-line of doing things. Search for third-party Childbirth Education that can show you how to cope with contractions naturally, such as Hypnobirth©, Hypnobabies©, Bradley©, Birthing From Within©, etc. Also check out SpinningBabies.com© for some excellent resources on Daily Activities and how to make sure your baby is in the best position for labor.
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Self Care:</strong> Make time for body work such as quality, Webster certified Chiropractic care, massage, prenatal yoga, quiet moments, visualization time, guided breathing, and/or walks in the sunshine.
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Postpartum Prep:</strong> How are you preparing to have an easier postpartum period, so that you can relax with your baby and focus on your breastfeeding relationship? What are you reading, organizing, meal-prepping, or learning about breastfeeding today? Who can you designate to do house-hold chores or bring meals so that you can hold and feed your baby?
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Fetal Love Break:</strong> Talk to your baby. Place your hands on your belly. What did you have to say?
          </Typography>
        </Box>
    );
};

export default AppTerms;