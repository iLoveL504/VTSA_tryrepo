import { useState, useEffect } from 'react'
import MenuBar from './components/UI/MenuBar'
import NavBar from './components/UI/NavBar.jsx'
import useToggle from './hooks/useToggle'
import Layout from './Pages/Layout'
import Dashboard from './Pages/Dashboard'
import Technician from './Pages/Technician/Technician.jsx'
import TechnicianInfo from './Pages/Technician/TechnicianInfo.jsx'
import Projects from './Pages/Projects/Projects'
import ProjectInfo from './Pages/Projects/ProjectInfo.jsx'
import ProjectProgress from './Pages/Projects/ProjectProgress.jsx'
import ProjectReport from './Pages/Projects/ProjectReport.jsx'
import PMS from './Pages/PMS'
import Login from './Pages/Login'
import Teams from './Pages/Teams'
import BabyBook from './Pages/BabyBook'
import CreateProject from './Pages/Projects/CreateProject'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth'
import useAxiosFetch from './hooks/useAxiosFetch'
import store from './app/store.js'
import AssignTeam from './Pages/AssignTeam.jsx'
import test from './Pages/test.jsx'
import QAQC_Checklist from './Pages/Documents/QAQC_Checklist.jsx'
import { useStoreState, useStoreActions } from 'easy-peasy'
import ScheduleProjects from './Pages/Projects/ScheduleProject.jsx'
import NotificationPage from './Pages/NotificationPage.jsx'

function App() {
  console.log(sessionStorage.getItem("isLoggedIn"))
  const [ empData, empFetchError, empIsLoading ] = useAxiosFetch('http://localhost:4000/employees')
  const [ projData, projFetchError, projIsLoading ] = useAxiosFetch('http://localhost:4000/projects')
  const [ notifData, notifFetchError, notifIsLoading ] = useAxiosFetch(`http://localhost:4000/notifications/${sessionStorage.getItem('id')}`)
  const dateNow = useStoreState(state => state.date)
  const setEmployees = useStoreActions(actions => actions.setEmployees)
  const setProjects = useStoreActions(actions => actions.setProjects)
  const setUser = useStoreActions(actions => actions.setUser)
  const setNotifications = useStoreActions(actions => actions.setNotifications)

  const emps = useStoreState(state => state.employees)
  useEffect(() => {
    setUser({ username: sessionStorage.getItem('username'), roles: sessionStorage.getItem('roles') })
    console.log(dateNow)
  }, [])

useEffect(() => {
  if (empData) setEmployees(empData)
}, [empData])

useEffect(() => {
  if (projData) setProjects(projData)
}, [projData])

useEffect(() => {
  if (notifData) setNotifications(notifData)
}, [notifData])
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
            <Route path=":projId/schedule" element={<ScheduleProjects />} />
            <Route path=":projId" element={<ProjectInfo />} />
            <Route path=":projId/team" element={<AssignTeam />} />
            <Route path="qaqc" element={<QAQC_Checklist />} />
            <Route path=":projId/progress" element={<ProjectProgress />} />
            <Route path=":projId/report" element={<ProjectReport />} />
          </Route>

          <Route path="PMS">
            <Route index element={<PMS />} />
            
          </Route>

          <Route path="notification">
            <Route path=":notifId" element={<NotificationPage />} />
            
          </Route>



          <Route path="teams" element={<Teams />} />
          <Route path="baby-book" element={<BabyBook />} />
        </Route>
        
      </Routes>
  )
}

export default App
