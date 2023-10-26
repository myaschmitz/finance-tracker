import './App.css';
import './styles/styles.css';

import Main from './containers/Main';
import Header from './containers/Header';
import Footer from './containers/Footer';

import React, { Suspense, useEffect, useState } from 'react';

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
        <Main />
        <Footer />
        <h1 style={{ textDecoration: "underline" }}>{message}</h1>
      </div>
    </Suspense>
  );
}

export default App;
