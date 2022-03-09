import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/auth-context';
import MessagePage from '../../components/MessagePage/MessagePage';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import Box from '@mui/material/Box';
import { mockEntries } from '../DashboardPage/DashboardPage';
import './UpdateEntryFormPage.css';

const UpdateEntryFormPage: React.FC = () => {
    const user = useContext(AuthContext);
    const { entryId } = useParams();
    const [date, setDate] = useState<string | null>(null);
    const [waterIntake, setWaterIntake] = useState<number | string>('');
    const [proteinIntake, setProteinIntake] = useState<number | string>('');
    const [exercise, setExercise] = useState<number | string>('');
    const [kegels, setKegels] = useState<number | string>('');
    const [garlandPose, setGarlandPose] = useState<number | string>('');
    const [prenatalVitamins, setPrenatalVitamins] = useState<boolean | null>(null);
    const [probiotics, setProbiotics] = useState<boolean | null>(null);

    useEffect(() => {
        if (entryId) {
            const foundEntry = mockEntries.find(entry => entry.id === parseInt(entryId)) 
            console.log(foundEntry)
            if (foundEntry) {
                setDate(foundEntry.date)
                setWaterIntake(foundEntry.waterIntake)
                setProteinIntake(foundEntry.proteinIntake)
                setExercise(foundEntry.exercise)
                setKegels(foundEntry.kegels)
                setGarlandPose(foundEntry.garlandPose)
                setPrenatalVitamins(foundEntry.prenatalVitamins)
                setProbiotics(foundEntry.probiotics)
            }
        }
    }, [entryId])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(moment(date).toISOString())
        // console.log(waterIntake)
        // console.log(proteinIntake)
        // console.log(exercise)
        // console.log(kegels)
        // console.log(garlandPose)
        // console.log(prenatalVitamins)
        // console.log(probiotics)
    }

    return user.isLoggedIn ? (
        <main>
            <form className="form" onSubmit={handleSubmit}>
                <Typography variant='h5' className="page-title">Update Journal Entry</Typography>
                <Typography variant="body1">Update the form below and save changes to your journal entry.</Typography>
                <FormLabel id="date-input-label">Entry date:</FormLabel>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
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
                    onChange={(e) => {setPrenatalVitamins(e.currentTarget.value === "true" ? true : false)}}
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
                        <Button variant='contained' color='inherit'>Cancel</Button>
                    </Box>
                </Box>
            </form>
        </main>
    ) : (
        <MessagePage 
            title="Uh oh, looks like you're not logged in."
            subtitle="You must be logged-in to view this page."
        />
    )
};

export default UpdateEntryFormPage;