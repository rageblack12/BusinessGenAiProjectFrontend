
import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/user/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<Home/>} 
        />
      </Routes> 
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;