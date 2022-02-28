import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './features/AppBar/AppBar';
import AppFooter from './features/AppFooter/AppFooter';
import { AuthContext } from './shared/auth-context';
import { PossibleRoutes } from './utils/constants';
import MainPage from './pages/MainPage/MainPage';
import NewEntryFormPage from './pages/NewEntryFormPage/NewEntryFormPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './configs/firebase.configs';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';

initializeApp(firebaseConfig);

const App = () => {
  const auth = getAuth();
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>('');
  const [photoURL, setPhotoURL] = useState<string | null>('');

  const createAccount = useCallback(async (email, password, displayName) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        updateProfile(response.user, {displayName: displayName})
          .then(() => {
            setUserId(response.user.uid);
            setIsLoggedIn(true);
            setDisplayName(displayName);
            setPhotoURL(response.user.photoURL);
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch((error) => {
        console.log(error);
      })
}, [auth]);

  const loginWithGoogle = useCallback(async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        setUserId(response.user.uid);
        setIsLoggedIn(true);
        setDisplayName(response.user.displayName);
        setPhotoURL(response.user.photoURL);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [auth]);

  const loginWithEmail = useCallback(async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUserId(response.user.uid);
        setIsLoggedIn(true);
        setDisplayName(response.user.displayName);
        setPhotoURL(response.user.photoURL);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [auth]);

  const logout = useCallback(() => {
    signOut(auth);
    setUserId(null);
    setIsLoggedIn(false);
  }, [auth]);

  const routes = (
    <Routes>
      <Route path={`${PossibleRoutes.ROOT}`} element={<MainPage />} />
      <Route path={`${PossibleRoutes.DASHBOARD}`} element={<DashboardPage />} />
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
        createAccount: createAccount,
        loginWithGoogle: loginWithGoogle,
        loginWithEmail: loginWithEmail,
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
