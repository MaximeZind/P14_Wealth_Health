import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import EmployeeList from '../pages/EmployeeList';
import BaseLayout from './BaseLayout';
import ErrorPage from '../pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path='/employeeslist' element={<EmployeeList />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;