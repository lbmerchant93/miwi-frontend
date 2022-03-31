import React, { useState, FormEvent, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { PossibleRoutes } from '../../../utils/constants';
import MessagePage from '../../../components/MessagePage/MessagePage';
import { useAuthorJournalEntry } from '../../../api/journalEntries/journalEntries';
import { useUpdateJournalEntry } from '../../../api/journalEntries/journalEntry';
import moment from 'moment';
import { useQueryClient } from 'react-query';


interface UpdateJournalEntryFormProps {
    entryId: string;
    handleSubmitResults: (error: boolean, message?: string) => void;
    userId: string | undefined;
}

const UpdateJournalEntryForm: React.FC<UpdateJournalEntryFormProps> = (props) => {
    const { entryId, userId, handleSubmitResults } = props;
    const navigate = useNavigate();
    const { data, isFetching, error } = useAuthorJournalEntry(entryId, userId);
    const [date, setDate] = useState<string | null>(null);
    const [waterIntake, setWaterIntake] = useState<number | string>('');
    const [proteinIntake, setProteinIntake] = useState<number | string>('');
    const [exercise, setExercise] = useState<number | string>('');
    const [kegels, setKegels] = useState<number | string>('');
    const [garlandPose, setGarlandPose] = useState<number | string>('');
    const [prenatalVitamins, setPrenatalVitamins] = useState<boolean | null>(null);
    const [probiotics, setProbiotics] = useState<boolean | null>(null);
    const [previousEntry, setPreviousEntry] = useState<{}>({})
    const updateJournalEntry = useUpdateJournalEntry();
    const queryClient = useQueryClient();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedJournalEntry = {
            id: entryId,
            date: date,
            waterIntake: waterIntake,
            proteinIntake: proteinIntake,
            exercise: exercise,
            kegels: kegels,
            garlandPose: garlandPose,
            prenatalVitamins: prenatalVitamins,
            probiotics: probiotics,
        };

        if (JSON.stringify(updatedJournalEntry) !== JSON.stringify(previousEntry)) {
            try {
                updateJournalEntry.mutate(updatedJournalEntry);
                handleSubmitResults(false);
            } catch (error) {
                console.log(error);
                handleSubmitResults(true);
            };
        } else {
            handleSubmitResults(true);
        };
    };

    const handleCancelUpdateEntryClick = (callback: () => void) => {
        return () => {
            callback()
        };
    };

    useEffect(() => {
        if (data && data.length) {
            setDate(data[0].date)
            setWaterIntake(data[0].waterIntake)
            setProteinIntake(data[0].proteinIntake)
            setExercise(data[0].exercise)
            setKegels(data[0].kegels)
            setGarlandPose(data[0].garlandPose)
            setPrenatalVitamins(data[0].prenatalVitamins)
            setProbiotics(data[0].probiotics)
            setPreviousEntry(
                {
                    id: entryId,
                    date: data[0].date,
                    waterIntake: data[0].waterIntake,
                    proteinIntake: data[0].proteinIntake,
                    exercise: data[0].exercise,
                    kegels: data[0].kegels,
                    garlandPose: data[0].garlandPose,
                    prenatalVitamins: data[0].prenatalVitamins,
                    probiotics: data[0].probiotics,
                }
            )
        } 
    }, [data, entryId]);

    useEffect(() => {
        queryClient.removeQueries(["authorJournalEntry"])
    }, []) // eslint-disable-line 
    // the above disable is to remove warning of needing queryClient as a dependency but we only want the useEffect to run once
    
    if (isFetching) {
        return (
            <p>Fetching data...</p>
        );
    };

    return (data && data.length && !error) ? (
        <form className="form" onSubmit={handleSubmit}>
            <Typography variant='h5' className="page-title">
                Update Journal Entry
            </Typography>
            <Typography variant="body1">
                Update the form below and save changes to your journal entry.
            </Typography>
            <FormLabel id="date-input-label">Entry date:</FormLabel>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                    value={date}
                    onChange={(newDate) => setDate(moment(newDate).startOf('day').toISOString(true))}
                    renderInput={(params) => <TextField required size='small' sx={{width: "200px"}} {...params} />}
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
            />
            <FormLabel id="prenatal-vitamins-label" >Did you take your prenatal vitamins? </FormLabel>
            <RadioGroup
                row
                aria-labelledby="prenatal-vitamins-input"
                name="prenatal-vitamins-input"
                value={prenatalVitamins}
                onChange={(e) => setPrenatalVitamins(e.currentTarget.value === "true" ? true : false)}
            >
                <FormControlLabel value="true" control={<Radio color="default" required={true}/>} label="Yes" />
                <FormControlLabel value="false" control={<Radio color="default" required={true}/>} label="No" />
            </RadioGroup>
            <FormLabel id="probiotics-label" >Did you take your probiotics? </FormLabel>
            <RadioGroup
                row
                aria-labelledby="probiotics-input"
                name="probiotics-input"
                value={probiotics}
                onChange={(e) => setProbiotics(e.currentTarget.value === "true" ? true : false)}
            >
                <FormControlLabel value="true" control={<Radio color="default" required={true}/>} label="Yes" />
                <FormControlLabel value="false" control={<Radio color="default" required={true}/>} label="No" />
            </RadioGroup>
            <Box className="update-entry-form-button-container">
                <Box className="update-entry-form-button">
                    <Button type='submit' variant='contained' color='success'>Update</Button>
                </Box>
                <Box className="update-entry-form-button">
                    <Button onClick={handleCancelUpdateEntryClick(() => navigate(PossibleRoutes.DASHBOARD))} variant='contained' color='inherit'>Cancel</Button>
                </Box>
            </Box>
        </form>
    ) : (
        <MessagePage 
            title="Uh oh, something went wrong."
            subtitle="Please try again later or contact us with any issues."
        />
    )
};

export default UpdateJournalEntryForm;