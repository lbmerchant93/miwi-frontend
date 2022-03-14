import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './features/AppBar/AppBar';
import AppFooter from './features/AppFooter/AppFooter';
import { AuthContext } from './shared/auth-context';
import { PossibleRoutes } from './utils/constants';
import MainPage from './pages/MainPage/MainPage';
import JournalEntryFormPage from './pages/JournalEntryFormPage/JournalEntryFormPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './configs/firebase.configs';
import { 
  getAuth, 
  signOut, 
  setPersistence, 
  browserLocalPersistence, 
  onAuthStateChanged
} from 'firebase/auth';

initializeApp(firebaseConfig);

const App = () => {
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>('');
  const [photoURL, setPhotoURL] = useState<string | null>('');
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid);
      setIsLoggedIn(true);
      setDisplayName(user.displayName);
      setPhotoURL(user.photoURL);
    } else {
      setUserId(null);
      setIsLoggedIn(false);
      setDisplayName('');
      setPhotoURL('');
      signOut(auth);
    }
  })

  const routes = (
    <Routes>
      <Route path={`${PossibleRoutes.ROOT}`} element={<MainPage />} />
      <Route path={`${PossibleRoutes.DASHBOARD}`} element={<DashboardPage />} />
      <Route path={`${PossibleRoutes.JOURNAL_ENTRY_FORM}`} element={<JournalEntryFormPage />} />
      <Route path={`${PossibleRoutes.UPDATE_JOURNAL_ENTRY_FORM}`} element={<JournalEntryFormPage />} />
    </Routes>
  );
  
  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedIn,
        id: userId,
        displayName: displayName,
        photoURL: photoURL
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <AppBar />
          <div>
            {routes}
          </div>
          <AppFooter />
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
