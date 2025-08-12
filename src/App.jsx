import { useState, useEffect } from 'react'
import MenuBar from './components/MenuBar'
import NavBar from './components/NavBar'
import useToggle from './hooks/useToggle'
import Layout from './Pages/Layout'
import Dashboard from './Pages/Dashboard'
import Technician from './Pages/Technician/Technician.jsx'
import TechnicianInfo from './Pages/Technician/TechnicianInfo.jsx'
import Projects from './Pages/Projects/Projects'
import PMS from './Pages/PMS'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Teams from './Pages/Teams'
import BabyBook from './Pages/BabyBook'
import CreateProject from './Pages/Projects/CreateProject'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth'
import useAxiosFetch from './hooks/useAxiosFetch'
import store from './app/store.js'
import { useStoreState, useStoreActions } from 'easy-peasy'

function App() {
  const [ roles, setRoles ] = useAuth()
  const [ empData, empFetchError, empIsLoading ] = useAxiosFetch('http://localhost:4000/employees')
  const [ projData, projFetchError, projIsLoading ] = useAxiosFetch('http://localhost:4000/projects')

  const setEmployees = useStoreActions(actions => actions.setEmployees)
  const setProjects = useStoreActions(actions => actions.setProjects)

  useEffect(() => {
    setEmployees(empData)
  }, [empData])

  useEffect(() => {
    setProjects(projData)
  }, [projData])
  console.log(empData)
  const location = useLocation()
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="technician">
            <Route index element={<Technician />} /> 
            <Route path=":empId" element={<TechnicianInfo />} />
          </Route>

          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path="create" element={<CreateProject />} />
          </Route>

          <Route path="PMS">
            <Route index element={<PMS />} />
          </Route>

          <Route path="teams" element={<Teams />} />
          <Route path="baby-book" element={<BabyBook />} />
        </Route>
        
      </Routes>
  )
}

export default App
