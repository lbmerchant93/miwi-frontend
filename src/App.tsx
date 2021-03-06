import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './features/AppBar/AppBar';
import AppFooter from './features/AppFooter/AppFooter';
import { PossibleRoutes } from './utils/constants';
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './configs/firebase.configs';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthProvider from './App.authProvider';
import AboutPage from './pages/AboutPage/AboutPage';
import HowMiWiWorksPage from './pages/HowMiWiWorksPage/HowMiWiWorksPage';

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
      <Route path={`${PossibleRoutes.DASHBOARD}`} element={<DashboardPage />} />
      <Route path={`${PossibleRoutes.DASHBOARD_TAB}`} element={<DashboardPage />} />
      <Route path={`${PossibleRoutes.ABOUT}`} element={<AboutPage />} />
      <Route path={`${PossibleRoutes.HOW_IT_WORKS}`} element={<HowMiWiWorksPage />} />
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
            <AppFooter />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
