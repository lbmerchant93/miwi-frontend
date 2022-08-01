import React, { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../../../shared/auth-context';
import { SnackBar, SnackBarDetails } from '../../../components/SnackBar/SnackBar';
import { Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useCreateJournalEntry } from '../../../api/journalEntries/journalEntry';
import moment from 'moment';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import './DashboardNewJournalEntryFormPage.css';

interface DashboardNewJournalEntryFormPageProps {
    navigateHomeRefetch: () => void;
}

const DashboardNewJournalEntryFormPage: React.FC<DashboardNewJournalEntryFormPageProps> = (props) => {
    const { navigateHomeRefetch } = props;
    const user = useContext(AuthContext);
    const [date, setDate] = useState<string | null>(null);
    const [waterIntake, setWaterIntake] = useState<number | string>('');
    const [proteinIntake, setProteinIntake] = useState<number | string>('');
    const [exercise, setExercise] = useState<number | string>('');
    const [kegels, setKegels] = useState<number | string>('');
    const [garlandPose, setGarlandPose] = useState<number | string>('');
    const [prenatalVitamins, setPrenatalVitamins] = useState<boolean | null>(null);
    const [probiotics, setProbiotics] = useState<boolean | null>(null);
    const [mood, setMood] = useState<string>('');
    const [childbirthEducation, setChildbirthEducation] = useState<string>('');
    const [selfCare, setSelfCare] = useState<string>('');
    const [postpartumPrep, setPostpartumPrep] = useState<string>('');
    const [fetalLoveBreak, setFetalLoveBreak] = useState<string>('');
    const [snackBarDetails, setSnackBarDetails] = useState<SnackBarDetails>({} as SnackBarDetails);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const createJournalEntry = useCreateJournalEntry();

    const dismissSnackBar = () => {
        setSnackBarDetails({ ...snackBarDetails, show: false });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)

        const journalEntry = {
            authorId: user.id,
            date: date,
            waterIntake: waterIntake,
            proteinIntake: proteinIntake,
            exercise: exercise,
            kegels: kegels,
            garlandPose: garlandPose,
            prenatalVitamins: prenatalVitamins,
            probiotics: probiotics,
            mood: mood,
            childbirthEducation: childbirthEducation,
            selfCare: selfCare,
            postpartumPrep: postpartumPrep,
            fetalLoveBreak: fetalLoveBreak
        };
    
        createJournalEntry.mutate(journalEntry, {
            onError: (err: any) => {
                setSnackBarDetails({ error: true, show: true, message: err.response.errors[0].message || `Something went wrong, please try again` })
                setIsLoading(false)
            },
            onSuccess: () => {
                setSnackBarDetails({ error: false, show: true, message: `Journal entry created!` })
                setTimeout(() => {
                    setIsLoading(false)
                    navigateHomeRefetch()
                }, 1500)
            }
        });
    };

    return (
        <>
            <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "error" : "success"} variant="filled">
                    {snackBarDetails.message}
                </Alert>
            </SnackBar>
            <form className="form" onSubmit={handleSubmit}>
                <Typography variant='h5' className="page-title">
                    Create A New Journal Entry
                </Typography>
                <Typography variant="body1">
                    Fill out the form below and select submit to create a new journal entry.
                </Typography>
                <FormLabel id="date-input-label">Entry date:</FormLabel>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                        value={date}
                        onChange={(newDate) => setDate(moment(newDate).startOf('day').toISOString(true))}
                        renderInput={(params) => <TextField required size='small' sx={{width: "200px"}} {...params} />}
                        disabled={isLoading}
                    />
                </LocalizationProvider>
                <FormLabel id="water-intake-label">How many ounces of water did you drink?</FormLabel>
                <TextField
                    id="water-intake-input"
                    type="number"
                    value={waterIntake}
                    onChange={(e) => setWaterIntake(parseInt(`${e.currentTarget.value}`))}
                    InputProps={{ inputProps: { min: 0 } }}
                    required
                    size='small'
                    disabled={isLoading}
                />
                <FormLabel id="water-intake-label">How many grams of protein did you have?</FormLabel>
                <TextField
                    id="protein-intake-input"
                    type="number"
                    value={proteinIntake}
                    onChange={(e) => setProteinIntake(parseInt(`${e.currentTarget.value}`))}
                    InputProps={{ inputProps: { min: 0 } }}
                    required
                    size='small'
                    disabled={isLoading}
                />
                <FormLabel id="water-intake-label">How many minutes did you exercise for?</FormLabel>
                <TextField
                    id="exercise-input"
                    type="number"
                    value={exercise}
                    onChange={(e) => setExercise(parseInt(`${e.currentTarget.value}`))}
                    InputProps={{ inputProps: { min: 0 } }}
                    required
                    size='small'
                    disabled={isLoading}
                />
                <FormLabel id="water-intake-label">How many kegels did you do?</FormLabel>
                <TextField
                    id="kegels-input"
                    type="number"
                    value={kegels}
                    onChange={(e) => setKegels(parseInt(`${e.currentTarget.value}`))}
                    InputProps={{ inputProps: { min: 0 } }}
                    required
                    size='small'
                    disabled={isLoading}
                />
                <FormLabel id="water-intake-label">How many minutes did you do garland pose for?</FormLabel>
                <TextField
                    id="garland-pose-input"
                    type="number"
                    value={garlandPose}
                    onChange={(e) => setGarlandPose(parseInt(`${e.currentTarget.value}`))}
                    InputProps={{ inputProps: { min: 0 } }}
                    required
                    size='small'
                    disabled={isLoading}
                />
                <FormLabel id="prenatal-vitamins-label" >Did you take your prenatal vitamins? </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="prenatal-vitamins-input"
                    name="prenatal-vitamins-input"
                    value={prenatalVitamins}
                    onChange={(e) => setPrenatalVitamins(e.currentTarget.value === "true" ? true : false)}
                >
                    <FormControlLabel value="true" control={<Radio color="default" required={true}/>} label="Yes" disabled={isLoading}/>
                    <FormControlLabel value="false" control={<Radio color="default" required={true}/>} label="No" disabled={isLoading}/>
                </RadioGroup>
                <FormLabel id="probiotics-label" >Did you take your probiotics? </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="probiotics-input"
                    name="probiotics-input"
                    value={probiotics}
                    onChange={(e) => setProbiotics(e.currentTarget.value === "true" ? true : false)}
                >
                    <FormControlLabel value="true" control={<Radio color="default" required={true}/>} label="Yes" disabled={isLoading}/>
                    <FormControlLabel value="false" control={<Radio color="default" required={true}/>} label="No" disabled={isLoading}/>
                </RadioGroup>
                <FormLabel id="mood-input-label">Mood: </FormLabel>
                <TextField
                    id="mood-input"
                    type="text"
                    value={mood}
                    onChange={(e) => setMood(e.currentTarget.value)}
                    size='small'
                    required
                    disabled={isLoading}
                />
                <FormLabel id="childbirthEducation-input-label">Childbirth education: </FormLabel>
                <TextField
                    id="childbirthEducation-input"
                    type="text"
                    value={childbirthEducation}
                    onChange={(e) => setChildbirthEducation(e.currentTarget.value)}
                    size='small'
                    required
                    disabled={isLoading}
                />
                <FormLabel id="selfCare-input-label">Self care: </FormLabel>
                <TextField
                    id="selfCare-input"
                    type="text"
                    value={selfCare}
                    onChange={(e) => setSelfCare(e.currentTarget.value)}
                    size='small'
                    required
                    disabled={isLoading}
                />
                <FormLabel id="postpartumPrep-input-label">Postpartum prep: </FormLabel>
                <TextField
                    id="postpartumPrep-input"
                    type="text"
                    value={postpartumPrep}
                    onChange={(e) => setPostpartumPrep(e.currentTarget.value)}
                    size='small'
                    required
                    disabled={isLoading}
                />
                <FormLabel id="fetalLoveBreak-input-label">Fetal love break: </FormLabel>
                <TextField
                    id="fetalLoveBreak-input"
                    type="text"
                    value={fetalLoveBreak}
                    onChange={(e) => setFetalLoveBreak(e.currentTarget.value)}
                    size='small'
                    required
                    disabled={isLoading}
                />
                <Box mt={1}>
                    <LoadingButton 
                        type='submit' 
                        variant='outlined' 
                        color='inherit'
                        loading={isLoading}
                    >
                        Submit
                    </LoadingButton>
                </Box>
            </form> 
        </>
    )
}

export default DashboardNewJournalEntryFormPage;