import './App.css';
import './styles/styles.css';

import Main from './containers/Main';
import Header from './containers/Header';
import Transactions from './containers/Transactions';
import Stats from './containers/Stats';
import Footer from './containers/Footer';
import Account from './containers/Account';
import Settings from './containers/Settings';

import theme from "./components/Theme";

import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Header />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
