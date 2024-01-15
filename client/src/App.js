import './App.css';
import './styles/styles.css';

import DrawerHeader from './containers/DrawerHeader';

import theme from "./components/Theme";

import React, { Suspense } from 'react';
import { Drawer, ThemeProvider } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <DrawerHeader />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
