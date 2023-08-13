import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import EmployeeList from '../pages/EmployeeList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/employeelist' element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;