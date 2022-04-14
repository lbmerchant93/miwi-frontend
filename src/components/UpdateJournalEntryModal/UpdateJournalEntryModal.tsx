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
// import { useNavigate } from 'react-router-dom';
// import { PossibleRoutes } from '../../utils/constants';
// import { useAuthorJournalEntry } from '../../api/journalEntries/journalEntries';
import { useUpdateJournalEntry } from '../../api/journalEntries/journalEntry';
import moment from 'moment';
import { useQueryClient } from 'react-query';
import Modal from '@mui/material/Modal';
import { JournalEntry } from '../../pages/DashboardPage/DashboardPage';


import './UpdateJournalEntryModal.css';

interface UpdateJournalEntryFormProps {
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    modalDescription: string;
    modalMessage: string;
    entry: JournalEntry;
    // handleSubmitResults: (error: boolean, message?: string) => void;
    userId: string | undefined;
}

const UpdateJournalEntryModal: React.FC<UpdateJournalEntryFormProps> = (props) => {
    const { 
        isOpen, 
        onClose, 
        modalTitle, 
        modalDescription, 
        entry,
        userId,
        // handleSubmitResults
    } = props;
    // const navigate = useNavigate();
    // const { data, isFetching, error } = useAuthorJournalEntry(entry.id, userId);
    const [date, setDate] = useState<string | null>(entry.date);
    const [waterIntake, setWaterIntake] = useState<number | string>(entry.waterIntake);
    const [proteinIntake, setProteinIntake] = useState<number | string>(entry.proteinIntake);
    const [exercise, setExercise] = useState<number | string>(entry.exercise);
    const [kegels, setKegels] = useState<number | string>(entry.kegels);
    const [garlandPose, setGarlandPose] = useState<number | string>(entry.garlandPose);
    const [prenatalVitamins, setPrenatalVitamins] = useState<boolean | null>(entry.prenatalVitamins);
    const [probiotics, setProbiotics] = useState<boolean | null>(entry.probiotics);
    // const [previousEntry, setPreviousEntry] = useState<{}>(entry)
    // const updateJournalEntry = useUpdateJournalEntry();
    const queryClient = useQueryClient();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const updatedJournalEntry = {
        //     id: entry.id,
        //     date: date,
        //     waterIntake: waterIntake,
        //     proteinIntake: proteinIntake,
        //     exercise: exercise,
        //     kegels: kegels,
        //     garlandPose: garlandPose,
        //     prenatalVitamins: prenatalVitamins,
        //     probiotics: probiotics,
        //     authorId: userId
        // };

        // if (JSON.stringify(updatedJournalEntry) !== JSON.stringify(previousEntry)) {
        //     updateJournalEntry.mutate(updatedJournalEntry, {
        //         onError: (err: any) => {
        //             handleSubmitResults(true, err.message)
        //         },
        //         onSuccess: () => {
        //             handleSubmitResults(false)
        //         }
        //     });
        //     handleSubmitResults(false);
        // } else {
        //     handleSubmitResults(true);
        // };
    };

    // const handleCancelUpdateEntryClick = (callback: () => void) => {
    //     return () => {
    //         callback()
    //     };
    // };

    // useEffect(() => {
    //     if (data && data.length) {
    //         setDate(data[0].date)
    //         setWaterIntake(data[0].waterIntake)
    //         setProteinIntake(data[0].proteinIntake)
    //         setExercise(data[0].exercise)
    //         setKegels(data[0].kegels)
    //         setGarlandPose(data[0].garlandPose)
    //         setPrenatalVitamins(data[0].prenatalVitamins)
    //         setProbiotics(data[0].probiotics)
    //         setPreviousEntry(
    //             {
    //                 id: entryId,
    //                 date: data[0].date,
    //                 waterIntake: data[0].waterIntake,
    //                 proteinIntake: data[0].proteinIntake,
    //                 exercise: data[0].exercise,
    //                 kegels: data[0].kegels,
    //                 garlandPose: data[0].garlandPose,
    //                 prenatalVitamins: data[0].prenatalVitamins,
    //                 probiotics: data[0].probiotics,
    //                 authorId: userId
    //             }
    //         )
    //     } 
    // }, [data, entryId, userId]);

    useEffect(() => {
        if (queryClient.getQueryData(["authorJournalEntry"])) {
            queryClient.removeQueries(["authorJournalEntry"])
        }
    }, []) // eslint-disable-line 
    // the above disable is to remove warning of needing queryClient as a dependency but we only want the useEffect to run once

    // if (isFetching) {
    //     return (
    //         <p>Fetching data...</p>
    //     );
    // };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby={`${modalTitle}`}
            aria-describedby={`${modalDescription}`}
            className="update-entry-modal"
        >
            <Box className="update-modal-container">
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
                            <Button onClick={onClose} variant='contained' color='inherit'>Cancel</Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Modal>
    //  {(data && data.length && !error) &&
        
    )
}

export default UpdateJournalEntryModal