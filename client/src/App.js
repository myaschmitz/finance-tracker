import './App.css';
import './styles/styles.css';

import Main from './containers/Main';
import Header from './containers/Header';
import Planner from './containers/Planner';
import Stats from './containers/Stats';
import Footer from './containers/Footer';
import Account from './containers/Account';
import Settings from './containers/Settings';

import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:9000/testAPI')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/Planner" element={<Planner/>} />
          <Route exact path="/Stats" element={<Stats/>} />
          <Route exact path="/Account" element={<Account />} />
          <Route exact path="/Settings" element={<Settings />} />
        </Routes>
        <h1 style={{ textDecoration: "underline" }}>{message}</h1>
      </div>
    </Suspense>
  );
}

export default App;
