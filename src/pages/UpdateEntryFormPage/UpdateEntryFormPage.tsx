import React, { FormEvent, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/auth-context';
import MessagePage from '../../components/MessagePage/MessagePage';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './UpdateEntryFormPage.css';

const UpdateEntryFormPage: React.FC = () => {
    const user = useContext(AuthContext);
    const { entryId } = useParams();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return user.isLoggedIn ? (
        <main>
            <form className="form" onSubmit={handleSubmit}>
                <Typography variant='h5' className="page-title">Update your journal entry</Typography>
                <Button type='submit' variant='outlined' color='inherit'>Submit</Button>
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