import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './features/AppBar/AppBar';
import AppFooter from './features/AppFooter/AppFooter';
import { AuthContext } from './shared/auth-context';
import { PossibleRoutes } from './utils/constants';
import MainPage from './pages/MainPage';
import NewEntryFormPage from './pages/NewEntryFormPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './configs/firebase.configs';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut  } from 'firebase/auth';

initializeApp(firebaseConfig);

const App = () => {
  const auth = getAuth();
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>('');
  const [photoURL, setPhotoURL] = useState<string | null>('');

  const login = useCallback(async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        setUserId(response.user.uid);
        setIsLoggedIn(true);
        setDisplayName(response.user.displayName)
        setPhotoURL(response.user.photoURL)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [auth]);

  const logout = useCallback(() => {
    signOut(auth)
    setUserId(null)
    setIsLoggedIn(false);
  }, [auth])

  const routes = (
      <Routes>
        <Route path={`${PossibleRoutes.ROOT}`} element={<MainPage />} />
        <Route path={`${PossibleRoutes.ALL_ENTRIES}`} element={<MainPage />} />
        <Route path={`${PossibleRoutes.NEW_ENTRY_FORM}`} element={<NewEntryFormPage />} />
      </Routes>
    )
  
  return (
      <AuthContext.Provider 
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          displayName: displayName,
          photoURL: photoURL,
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
