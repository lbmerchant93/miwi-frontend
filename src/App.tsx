import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './features/AppBar/AppBar';
import AppFooter from './features/AppFooter/AppFooter';
import { AuthContext } from './shared/auth-context';
import { PossibleRoutes } from './utils/constants';
import MainPage from './pages/MainPage';
import NewEntry from './pages/NewEntry';

const App = () => {

  let routes = (
    <Routes>
      <Route path={`${PossibleRoutes.ROOT}`} element={<MainPage />} />
      <Route path={`${PossibleRoutes.ALL_ENTRIES}`} element={<MainPage />} />
      <Route path={`${PossibleRoutes.NEW_ENTRY}`} element={<NewEntry />} />
    </Routes>
  )
  return (
      <AuthContext.Provider 
        value={{
          isLoggedIn: false,
          token: null,
          userId: null,
        }}
      >
        <Router>
          <AppBar />
          <main>
            {routes}
          </main>
          <AppFooter />
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
