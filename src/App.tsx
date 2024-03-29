import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './features/AppBar/AppBar';
import AppFooter from './features/AppFooter/AppFooter';
import { PossibleRoutes } from './utils/constants';
import LandingPage from './pages/LandingPage/LandingPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './configs/firebase.configs';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthProvider from './App.authProvider';
import AboutPage from './pages/AboutPage/AboutPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import JournalPage from './pages/JournalPage/JournalPage';
import JournalEntryPage from './pages/JournalEntryPage/JournalEntryPage';
import HowMiWiWorksDashboard from './pages/HowMiWiWorks/HowMiWiWorksDashboard';
import Divider from '@mui/material/Divider';
import MessagePage from './components/MessagePage/MessagePage';

export const endpoint: string = process.env.NODE_ENV === 'production' ? (process.env.REACT_APP_GQL_ENDPOINT_PRODUCTION as string) : (process.env.REACT_APP_GQL_ENDPOINT_DEVELOPMENT as string)

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
    },
  },
});

initializeApp(firebaseConfig);

const App = () => {

  const routes = (
    <Routes>
      <Route path={`${PossibleRoutes.ROOT}`} element={<LandingPage />} />
      <Route path={`${PossibleRoutes.ABOUT}`} element={<AboutPage />} />
      <Route path={`${PossibleRoutes.HOW_MIWI_WORKS}`} element={<HowMiWiWorksDashboard />} />
      <Route path={`${PossibleRoutes.HOW_MIWI_WORKS_TAB}`} element={<HowMiWiWorksDashboard />} />
      <Route path={`${PossibleRoutes.HOME_USER}`} element={<HomePage />} />
      <Route path={`${PossibleRoutes.PROFILE_USER}`} element={<ProfilePage />} />
      <Route path={`${PossibleRoutes.JOURNAL_ENTRIES}`} element={<JournalPage />} />
      <Route path={`${PossibleRoutes.JOURNAL_ENTRIES_ENTRY}`} element={<JournalEntryPage />} />
      <Route path="*" element={<MessagePage title="Uh oh, page not found." subtitle="Please enter a valid url or select from the the links below."/>} />
    </Routes>
  );
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <ReactQueryDevtools initialIsOpen={false} />
            <AppBar />
            <main>
              {routes}
            </main>
            <Divider variant="middle" />
            <AppFooter />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;