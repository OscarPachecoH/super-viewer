import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRouter from './Components/ProtectedRouter';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ShowProjects from './Pages/ShowProjects';
import Profile from './Pages/Profile';

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route index element={
          <ProtectedRouter requiresAuth={false} redirectTo='/projects'>
            <Login/>
          </ProtectedRouter>
        }/>
        <Route path='/login' element={
          <ProtectedRouter requiresAuth={false} redirectTo='/projects'>
            <Login/>
          </ProtectedRouter>
        }/>
        <Route path='/profile' element={
          <ProtectedRouter requiresAuth={true} redirectTo='/profile'>
            <Profile/>
          </ProtectedRouter>
        }/>
        <Route path='/projects' element={
          <ProtectedRouter requiresAuth={true}>
            <ShowProjects />
          </ProtectedRouter>
        } />
        <Route path='/dashboard/:projectId' element={
          <ProtectedRouter requiresAuth={true}>
            <Dashboard/>
          </ProtectedRouter>
        }/>
        <Route path="/" element={<Navigate to="/projects" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;