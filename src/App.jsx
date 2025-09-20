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
import { useNavigate, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth'
import useAxiosFetch from './hooks/useAxiosFetch'
import store from './app/store.js'
import AssignTeam from './Pages/AssignTeam.jsx'
import test1 from './Pages/test1.jsx'
import QAQC_Checklist from './Pages/Documents/QAQC_Checklist.jsx'
import { useStoreState, useStoreActions } from 'easy-peasy'
import ScheduleProjects from './Pages/Projects/ScheduleProject.jsx'
import NotificationPage from './Pages/NotificationPage.jsx'
import Chat from './Pages/Chat.jsx'
import NotLoggedIn from './Pages/NotLoggedIn.jsx'
import { useSocket } from './hooks/useSocket.js'

function App() {
  const navigate = useNavigate()
  const [ empData, empFetchError, empIsLoading ] = useAxiosFetch('http://localhost:4000/employees')
  const [ projData, projFetchError, projIsLoading ] = useAxiosFetch('http://localhost:4000/projects')
  const [ notifData, notifFetchError, notifIsLoading ] = useAxiosFetch(`http://localhost:4000/notifications/${sessionStorage.getItem('id')}`)
  const dateNow = useStoreState(state => state.date)
  //const isLoggedIn = useStoreState(state => state.isLoggedIn)
  const setEmployees = useStoreActions(actions => actions.setEmployees)
  const setProjects = useStoreActions(actions => actions.setProjects)
  const setUser = useStoreActions(actions => actions.setUser)
  const setNotifications = useStoreActions(actions => actions.setNotifications)
  const addNotificationToState = useStoreActions(actions => actions.addNotificationToState)
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true" ? true : false 
  // add event listeners to socket hook
  const socket = useSocket({
    new_notification: (notification) => {
      console.log("Received notification:", notification)
       addNotificationToState(notification)
    }
  })

  const emps = useStoreState(state => state.employees)
  useEffect(() => {
    // Handle login state and user data
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    
    if (loggedIn) {
      setUser({ 
        username: sessionStorage.getItem('username'), 
        roles: sessionStorage.getItem('roles') 
      });
    }
    
    console.log(dateNow);
  }, [setUser]);
  
  //join room useEffect
  useEffect(() => {
    console.log('useeffect fired here')
    console.log(socket)
    if(socket && isLoggedIn === true) {
      socket.emit("join_notifications", sessionStorage.getItem("id"))
      
    }
  }, [socket, isLoggedIn])

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
        {/* <Route path="/not-logged-in" element={<NotLoggedIn />} /> */}
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
          <Route path="test" element={<NotLoggedIn />} />
          <Route path="PMS">
            <Route index element={<PMS />} />
            
          </Route>

          <Route path="notification">
            <Route path=":notifId" element={<NotificationPage />} />
            
          </Route>
          <Route path="chat">
            <Route index element={<Chat />} />
            
          </Route>



          <Route path="teams" element={<Teams />} />
          <Route path="baby-book" element={<BabyBook />} />
        </Route>
        
      </Routes>
  )
}

export default App
