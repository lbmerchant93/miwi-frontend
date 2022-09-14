import React from 'react';
import { useParams } from 'react-router-dom';

const HomePage = () => {
    const { user } = useParams();
    
    return (
        <div>HomePage</div>
    );
}

export default HomePage