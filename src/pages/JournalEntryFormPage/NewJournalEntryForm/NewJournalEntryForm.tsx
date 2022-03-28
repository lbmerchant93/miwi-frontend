import React, { useState, FormEvent } from 'react';
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
import { useCreateJournalEntry } from '../../../api/journalEntries/journalEntry';
import moment from 'moment';

interface JournalEntryFormProps {
    userId: string | undefined;
    handleSubmitResults: (results: string) => void;
}

const JournalEntryForm: React.FC<JournalEntryFormProps> = (props) => {
    const { userId, handleSubmitResults } = props;
    const [date, setDate] = useState<string | null>(null);
    const [waterIntake, setWaterIntake] = useState<number | string>('');
    const [proteinIntake, setProteinIntake] = useState<number | string>('');
    const [exercise, setExercise] = useState<number | string>('');
    const [kegels, setKegels] = useState<number | string>('');
    const [garlandPose, setGarlandPose] = useState<number | string>('');
    const [prenatalVitamins, setPrenatalVitamins] = useState<boolean | null>(null);
    const [probiotics, setProbiotics] = useState<boolean | null>(null);
    const createJournalEntry = useCreateJournalEntry();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const journalEntry = {
            authorId: userId,
            date: date,
            waterIntake: waterIntake,
            proteinIntake: proteinIntake,
            exercise: exercise,
            kegels: kegels,
            garlandPose: garlandPose,
            prenatalVitamins: prenatalVitamins,
            probiotics: probiotics,
        }

        try {
            createJournalEntry.mutate(journalEntry)
            handleSubmitResults("success")
        } catch (error) {
            console.log(error)
            handleSubmitResults("error")
        }
    }

    return (
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
                    onChange={(newDate) => setDate(moment(newDate).toISOString())}
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
            <Button type='submit' variant='outlined' color='inherit'>Submit</Button>
        </form> 
    );
};

export default JournalEntryForm;