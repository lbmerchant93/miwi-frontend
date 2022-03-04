import React, { useState, FormEvent, ChangeEvent, useContext } from 'react';
import { AuthContext } from '../../shared/auth-context';
import MessagePage from '../../components/MessagePage/MessagePage';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import './NewEntryFormPage.css';

export interface IJournalEntryData {
  date: string;
  prenatalVitamins: boolean;
  probiotics: boolean;
  waterIntake: number;
  proteinIntake: number;
  exercise: number;
  kegels: number;
  garlandPose: number;
  userId: string;
}

const NewEntryFormPage: React.FC = () => {
    const user = useContext(AuthContext);
    const [formData, setFormData] = useState<IJournalEntryData>({
        date: '',
        waterIntake: 0,
        proteinIntake: 0,
        exercise: 0,
        kegels: 0,
        garlandPose: 0,
        prenatalVitamins: false,
        probiotics: false,
        userId: "1"
    })
    const [prenatalVitamins, setPrenatalVitamins] = useState<string | null>(null);
    const [probiotics, setProbiotics] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.currentTarget.name]: e.currentTarget.value})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
    }

    return user.isLoggedIn ? (
        <main>
            <Typography variant='h2' className="page-title">Create a new journal entry!</Typography>
            <form className="form" onSubmit={handleSubmit}>
                <label>Date: </label>
                <input 
                    type='date' 
                    name='date' 
                    onChange={handleChange} 
                    required
                />
                <label>How many ounces of water did you drink?</label>
                <input 
                    type='number' 
                    name='waterIntake' 
                    placeholder='0' 
                    min='0' 
                    className="number-input"
                    onChange={handleChange}
                    required
                />
                <label>How many grams of protein did you have?</label>
                <input 
                    type='number' 
                    name='proteinIntake' 
                    placeholder='0' 
                    min='0' 
                    className="number-input"
                    onChange={handleChange}
                    required
                />
                <label>How many minutes did you exercise for?</label>
                <input 
                    type='number' 
                    name='exercise' 
                    placeholder='0' 
                    min='0' 
                    className="number-input"
                    onChange={handleChange}
                    required
                />
                <label>How many kegels did you do?</label>
                <input 
                    type='number' 
                    name='kegels' 
                    placeholder='0' 
                    min='0' 
                    className="number-input"
                    onChange={handleChange}
                    required
                />
                <label>How many minutes did you do garland pose for?</label>
                <input 
                    type='number' 
                    name='garlandPose' 
                    placeholder='0' 
                    min='0' 
                    className="number-input"
                    onChange={handleChange} 
                    required
                />
                <FormLabel id="demo-controlled-radio-buttons-group" >Did you take your prenatal vitamins? </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={prenatalVitamins}
                    onChange={(e) => setPrenatalVitamins(e.currentTarget.value)}
                >
                    <FormControlLabel value="true" control={<Radio color="default" />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio color="default" />} label="No" />
                </RadioGroup>
                <FormLabel id="demo-controlled-radio-buttons-group" >Did you take your probiotics? </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={probiotics}
                    onChange={(e) => setProbiotics(e.currentTarget.value)}
                >
                    <FormControlLabel value="true" control={<Radio color="default" />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio color="default" />} label="No" />
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