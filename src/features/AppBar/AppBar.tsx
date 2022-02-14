import React from 'react';
import { Link } from 'react-router-dom';
import { PossibleRoutes } from '../../utils/constants';
import './AppBar.css'

const AppBar: React.FC = () => {

    return (
        <header>
            <Link to={`${PossibleRoutes.ROOT}`} className="title-link">
                <h1 className="title">MiWi</h1>
            </Link>
            <div className="nav-options">
                <Link to={`${PossibleRoutes.NEW_ENTRY}`} className="nav-link">
                    New Entry
                </Link>
                <Link to={`${PossibleRoutes.ALL_ENTRIES}`} className="nav-link">
                    All Entries
                </Link>
            </div>
        </header>
    );
};

export default AppBar;