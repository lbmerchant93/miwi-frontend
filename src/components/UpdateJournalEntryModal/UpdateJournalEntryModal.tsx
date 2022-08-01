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
import { useUpdateJournalEntry } from '../../api/journalEntries/journalEntry';
import moment from 'moment';
import Modal from '@mui/material/Modal';
import { JournalEntry } from '../../pages/DashboardPage/DashboardPage';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import './UpdateJournalEntryModal.css';

interface UpdateJournalEntryFormProps {
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    modalDescription: string;
    modalMessage: string;
    entry: JournalEntry;
    onUpdateClick: (err: boolean, message: string) => void;
}

const UpdateJournalEntryModal: React.FC<UpdateJournalEntryFormProps> = (props) => {
    const { 
        isOpen, 
        onClose, 
        modalTitle, 
        modalDescription, 
        entry,
        onUpdateClick
    } = props;
    const [date, setDate] = useState<string>(entry.date);
    const [waterIntake, setWaterIntake] = useState<number>(entry.waterIntake);
    const [proteinIntake, setProteinIntake] = useState<number>(entry.proteinIntake);
    const [exercise, setExercise] = useState<number>(entry.exercise);
    const [kegels, setKegels] = useState<number>(entry.kegels);
    const [garlandPose, setGarlandPose] = useState<number>(entry.garlandPose);
    const [prenatalVitamins, setPrenatalVitamins] = useState<boolean>(entry.prenatalVitamins);
    const [probiotics, setProbiotics] = useState<boolean>(entry.probiotics);
    const [mood, setMood] = useState<string>('');
    const [childbirthEducation, setChildbirthEducation] = useState<string>('');
    const [selfCare, setSelfCare] = useState<string>('');
    const [postpartumPrep, setPostpartumPrep] = useState<string>('');
    const [fetalLoveBreak, setFetalLoveBreak] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const updateJournalEntry = useUpdateJournalEntry();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        const updatedEntry = {
            id: JSON.stringify(entry.id),
            date: date,
            waterIntake: waterIntake,
            proteinIntake: proteinIntake,
            exercise: exercise,
            kegels: kegels,
            garlandPose: garlandPose,
            prenatalVitamins: prenatalVitamins,
            probiotics: probiotics,
            authorId: entry.authorId,
            mood: mood,
            childbirthEducation: childbirthEducation,
            selfCare: selfCare,
            postpartumPrep: postpartumPrep,
            fetalLoveBreak: fetalLoveBreak
        };
    
        const previousEntry = {
            id: JSON.stringify(entry.id),
            date: entry.date,
            waterIntake: entry.waterIntake,
            proteinIntake: entry.proteinIntake,
            exercise: entry.exercise,
            kegels: entry.kegels,
            garlandPose: entry.garlandPose,
            prenatalVitamins: entry.prenatalVitamins,
            probiotics: entry.probiotics,
            authorId: entry.authorId,
            mood: entry.mood,
            childbirthEducation: entry.childbirthEducation,
            selfCare: entry.selfCare,
            postpartumPrep: entry.postpartumPrep,
            fetalLoveBreak: entry.fetalLoveBreak
        }
    
        if (JSON.stringify(updatedEntry) !== JSON.stringify(previousEntry)) {
            updateJournalEntry.mutate(updatedEntry, {
                onError: (err: any) => {
                    onUpdateClick(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                },
                onSuccess: () => {
                    onUpdateClick(false, 'Journal entry update successful!')
                },
                onSettled: () => {
                    setIsLoading(false)
                }
            });
        } else {
            onUpdateClick(true, 'Please update the form before clicking submit.')
            setIsLoading(false)
        };
    };

    const handleClose = () => {
        setDate(entry.date)
        setWaterIntake(entry.waterIntake)
        setProteinIntake(entry.proteinIntake)
        setExercise(entry.exercise)
        setKegels(entry.kegels)
        setGarlandPose(entry.garlandPose)
        setPrenatalVitamins(entry.prenatalVitamins)
        setProbiotics(entry.probiotics)
        onClose()
    }

    useEffect(() => {
        setDate(entry.date)
        setWaterIntake(entry.waterIntake)
        setProteinIntake(entry.proteinIntake)
        setExercise(entry.exercise)
        setKegels(entry.kegels)
        setGarlandPose(entry.garlandPose)
        setPrenatalVitamins(entry.prenatalVitamins)
        setProbiotics(entry.probiotics)
    }, [entry])

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby={`${modalTitle}`}
            aria-describedby={`${modalDescription}`}
            className="update-entry-modal"
        >
            <Box className="update-modal-container">
                <Box alignSelf={'flex-end'} position={"relative"} top={4} right={-17}>
                    <IconButton onClick={onClose} edge="start" color="inherit" aria-label="exit">
                        <CloseIcon />
                    </IconButton>
                </Box>
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
                    <Box className="update-entry-form-button-container">
                        <Box className="update-entry-form-button">
                            <LoadingButton 
                                type='submit' 
                                variant='contained' 
                                color='success'
                                loading={isLoading}
                            >
                                    Update
                            </LoadingButton>
                        </Box>
                        {!isLoading && <Box className="update-entry-form-button">
                            <Button onClick={handleClose} variant='contained' color='inherit'>Cancel</Button>
                        </Box>}
                    </Box>
                </form>
            </Box>
        </Modal>   
    )
}

export default UpdateJournalEntryModal