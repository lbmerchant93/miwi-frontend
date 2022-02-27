import React, { useState, FormEvent, ChangeEvent, useContext } from 'react';
import { AuthContext } from '../../shared/auth-context';
import MessagePage from '../../components/MessagePage/MessagePage';
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newInput: string | number | boolean;
        let numberInputs = ['waterIntake', 'proteinIntake', 'exercise', 'kegels', 'garlandPose'];
        let booleanInputs = ['prenatalVitamins', 'probiotics']
        if (numberInputs.includes(e.currentTarget.name)) {
            newInput = parseInt(e.currentTarget.value)
        } else if (booleanInputs.includes(e.currentTarget.name) && e.currentTarget.value === "true") {
            newInput = true
        } else if (booleanInputs.includes(e.currentTarget.name) && e.currentTarget.value === "false") {
            newInput = false
        } else {
            newInput = e.currentTarget.value
        }
        setFormData({...formData, [e.currentTarget.name]: newInput})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(formData)
    }

    return user.isLoggedIn ? (
        <main>
        <h2 className="page-title">Create a new journal entry!</h2>
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
                <label>
                    Did you take prenatal vitamins?  
                    <label>
                        Yes
                        <input 
                            name='prenatalVitamins' 
                            type='radio' 
                            value='true' 
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        No
                        <input 
                            name='prenatalVitamins' 
                            type='radio' 
                            value='false' 
                            onChange={handleChange}
                        />
                    </label>
                </label>
                <label>
                    Did you take probiotics? 
                    <label>
                        Yes
                        <input 
                            name='probiotics' 
                            type='radio' 
                            value='true' 
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        No
                        <input 
                            name='probiotics' 
                            type='radio' 
                            value='false' 
                            onChange={handleChange}
                        />
                    </label>
                </label>
                <button type='submit'>Submit</button>
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