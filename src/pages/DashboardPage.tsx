import React, { useContext } from 'react';
import { AuthContext } from '../shared/auth-context';
import MessagePage from '../components/MessagePage';

import './DashboardPage.css';

const DashboardPage = () => {
    const user = useContext(AuthContext);

    return user.isLoggedIn ? (
        <div>DashboardPage</div>
    ) : (
        <MessagePage 
            title="Uh oh, looks like you're not logged in."
            subtitle="You must be logged-in to view this page."
        />
    )
}

export default DashboardPage;