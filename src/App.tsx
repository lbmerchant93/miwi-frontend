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

export const endpoint = 'http://localhost:9000/graphql';

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
