import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CreateEmployee from '../pages/CreateEmployee';
import EmployeeList from '../pages/EmployeeList';
import BaseLayout from './BaseLayout';
import ErrorPage from '../pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<BaseLayout />}>
          <Route index element={<CreateEmployee />} />
          <Route path='/employeeslist' element={<EmployeeList />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;