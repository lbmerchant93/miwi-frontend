import React from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const { user } = useParams();
    
    return (
        <div>ProfilePage</div>
    );
}

export default ProfilePage