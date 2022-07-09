import React from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';

import Layout from './components/Layout';
import CatsList from './components/CatsList';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate replace to='/home' />} />
          <Route path='/home' element={<CatsList />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
