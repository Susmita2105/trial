import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Grid from './components/grid';
import Detail from './components/detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Grid />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
