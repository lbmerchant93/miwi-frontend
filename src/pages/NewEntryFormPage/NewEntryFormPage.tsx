import React, { useState, FormEvent, useContext } from 'react';
import { AuthContext } from '../../shared/auth-context';
import MessagePage from '../../components/MessagePage/MessagePage';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import './NewEntryFormPage.css';

const NewEntryFormPage: React.FC = () => {
    const user = useContext(AuthContext);
    const [date, setDate] = useState<string | null>(null);
    const [waterIntake, setWaterIntake] = useState<number>(0);
    const [proteinIntake, setProteinIntake] = useState<number>(0);
    const [exercise, setExercise] = useState<number>(0);
    const [kegels, setKegels] = useState<number>(0);
    const [garlandPose, setGarlandPose] = useState<number>(0);
    const [prenatalVitamins, setPrenatalVitamins] = useState<string | null>(null);
    const [probiotics, setProbiotics] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return user.isLoggedIn ? (
        <main>
            <Typography variant='h3' className="page-title">Create a new journal entry!</Typography>
            <form className="form" onSubmit={handleSubmit}>
                <label>Date: </label>
                <input 
                    type='date' 
                    name='date' 
                    onChange={(e) => setDate(e.currentTarget.value)} 
                    required
                />
                <FormLabel id="water-intake-label">How many ounces of water did you drink?</FormLabel>
                <TextField
                    id="water-intake-input"
                    type="number"
                    value={waterIntake}
                    onChange={(e) => setWaterIntake(parseInt(`${e.currentTarget.value}`))}
                    InputProps={{ inputProps: { min: 0 } }}
                />
                <FormLabel id="water-intake-label">How many grams of protein did you have?</FormLabel>
                <TextField
                    id="water-intake-input"
                    type="number"
                    value={proteinIntake}
                    onChange={(e) => setProteinIntake(parseInt(`${e.currentTarget.value}`))}
                    InputProps={{ inputProps: { min: 0 } }}
                />
                <FormLabel id="water-intake-label">How many minutes did you exercise for?</FormLabel>
                <TextField
                    id="water-intake-input"
                    type="number"
                    value={exercise}
                    onChange={(e) => setExercise(parseInt(`${e.currentTarget.value}`))}
                    InputProps={{ inputProps: { min: 0 } }}
                />
                <FormLabel id="water-intake-label">How many kegels did you do?</FormLabel>
                <TextField
                    id="water-intake-input"
                    type="number"
                    value={kegels}
                    onChange={(e) => setKegels(parseInt(`${e.currentTarget.value}`))}
                    InputProps={{ inputProps: { min: 0 } }}
                />
                <FormLabel id="water-intake-label">How many minutes did you do garland pose for?</FormLabel>
                <TextField
                    id="water-intake-input"
                    type="number"
                    value={garlandPose}
                    onChange={(e) => setGarlandPose(parseInt(`${e.currentTarget.value}`))}
                    InputProps={{ inputProps: { min: 0 } }}
                />
                <FormLabel id="prenatal-vitamins-label" >Did you take your prenatal vitamins? </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="prenatal-vitamins-input"
                    name="prenatal-vitamins-input"
                    value={prenatalVitamins}
                    onChange={(e) => setPrenatalVitamins(e.currentTarget.value)}
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
                    onChange={(e) => setProbiotics(e.currentTarget.value)}
                >
                    <FormControlLabel value="true" control={<Radio color="default" required={true}/>} label="Yes" />
                    <FormControlLabel value="false" control={<Radio color="default" required={true}/>} label="No" />
                </RadioGroup>
                <Button type='submit' variant='outlined' color='inherit'>Submit</Button>
            </form> 
        </main>
    ) : (
        <MessagePage 
            title="Uh oh, looks like you're not logged in."
            subtitle="You must be logged-in to view this page."
        />
    )
}

export default NewEntryFormPage;