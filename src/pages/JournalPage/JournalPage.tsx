import React from 'react';
import { useParams } from 'react-router-dom';

const JournalPage = () => {
    const { user } = useParams();
    
    return (
        <div>JournalPage</div>
    );
}

export default JournalPage