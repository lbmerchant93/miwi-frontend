import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './features/AppBar/AppBar';
import AppFooter from './features/AppFooter/AppFooter';
import { AuthContext } from './shared/auth-context';
import { PossibleRoutes } from './utils/constants';
import MainPage from './pages/MainPage';
import NewEntryForm from './pages/NewEntry';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './configs/firebase.configs';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut  } from 'firebase/auth';

initializeApp(firebaseConfig);

const App = () => {
  const auth = getAuth();
  const [userId, setUserId] = useState('');

  const login = useCallback(async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        setUserId(response.user.uid)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [auth]);

  const logout = useCallback(() => {
    signOut(auth)
    setUserId('')
  }, [auth])

  let routes = (
    <Routes>
      <Route path={`${PossibleRoutes.ROOT}`} element={<MainPage />} />
      <Route path={`${PossibleRoutes.ALL_ENTRIES}`} element={<MainPage />} />
      <Route path={`${PossibleRoutes.NEW_ENTRY_FORM}`} element={<NewEntryForm />} />
    </Routes>
  )
  return (
      <AuthContext.Provider 
        value={{
          isLoggedIn: false,
          token: null,
          userId: userId,
          login: login,
          logout: logout
        }}
      >
        <ThemeProvider theme={theme}>
          <Router>
            <AppBar />
            <main>
              {routes}
            </main>
            <AppFooter />
          </Router>
        </ThemeProvider>
      </AuthContext.Provider>
  );
}

export default App;
