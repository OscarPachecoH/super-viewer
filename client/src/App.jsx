import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRouter from './Components/ProtectedRouter';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route index element={
          <ProtectedRouter requiresAuth={false} redirectTo='/dashboard'>
            <Login/>
          </ProtectedRouter>
        }/>
        <Route path='/login' element={
          <ProtectedRouter requiresAuth={false} redirectTo='/dashboard'>
            <Login/>
          </ProtectedRouter>
        }/>
        <Route path='/dashboard' element={
          <ProtectedRouter requiresAuth={true}>
            <Dashboard/>
          </ProtectedRouter>
        }/>
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;