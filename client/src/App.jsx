import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRouter from './Components/ProtectedRouter';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ShowProjects from './Pages/ShowProjects';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import './Styles/Styles.css'

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
          <ProtectedRouter requiresAuth={true}>
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
        <Route path="/" element={<Navigate to="/projects" />} /> //Redirige a la vista projects pero si no hay usuario autentificado manda a login
        <Route path="*" element={<NotFound/>}/> //Si el usuario coloca mal la URL muestra esta vista
      </Routes>
    </BrowserRouter>
  )
}

export default App;