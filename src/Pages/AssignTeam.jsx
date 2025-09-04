import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy'
import { Grid } from 'ldrs/react'
import { useParams } from 'react-router-dom'
import { Axios } from '../api/axios.js'
import useAxiosFetch from '../hooks/useAxiosFetch.js'
import 'ldrs/react/Grid.css'


const AssignTeam = () => {
  const { projId } = useParams()
  const projects = useStoreState(state => state.projects)
  const foundProject = projects.find(p => p.id === Number(projId))
  const [availableInfo, availableFetchError, availableIsLoading] = useAxiosFetch('http://localhost:4000/teams/no-team')
 
  // Sample list of available technicians
  const [isLoading, setIsLoading] = useState(true)
  const [availableTechs, setAvailableTechs] = useState();
  const [forecastedAvailable, setForecastedAvailable] = useState()
  const [team, setTeam] = useState([]);
  const [error, setError] = useState('');

  //filter employees
  const[filter, setFilter] = useState('')
  const [techView, setTechView] = useState('available'); // 'available' or 'forecasted'

  //loading useEffect
  useEffect (() => {
    console.log(availableInfo)
    if(foundProject !== undefined && !availableIsLoading){
      const filteredEmp = availableInfo.filter(e => e.job !== 'manager' && e.job !== 'Project Manager')
      const memp = filteredEmp.map(e => ({...e, assigned: false, forecasted: false}))
      console.log(availableIsLoading)
      const dateOnly = new Date(foundProject.manufacturing_end_date).toISOString().split("T")[0];
      
      const fetchData = async () => {
        const res = await Axios.post('/teams/forecast-team',{
          manufacturing_end_date: '2025-10-14'
        })
        const femp = res.data.map(e => ({...e, assigned: false, forecasted: true}))
        setForecastedAvailable(femp)
        setIsLoading(false)
      }
      fetchData()
      setAvailableTechs(memp)
      
    }
  }, [availableInfo ,projects, foundProject])




  const assignTech = (tech) => {
    console.log(tech.forecasted)
    console.log()
    if (team.length >= 6) {
      setError('Team is already full (6 members max)');
      return;
    }

    // Check if adding would exceed job limits
    if (tech.job === 'Project Engineer' && 
        team.filter(m => m.job === 'Project Engineer').length >= 1) {
      setError('Maximum 1 Project Engineer allowed');
      return;
    }

    if (tech.job === 'Foreman' && 
        team.filter(m => m.job === 'Foreman').length >= 2) {
      setError('Maximum 2 Foremen allowed');
      return;
    }
    if(tech.forecasted === false){
      setAvailableTechs(availableTechs.map(t => 
        t.employee_id === tech.employee_id ? {...t, assigned: true} : t
      ));
    }
    if(tech.forecasted === true){
      setForecastedAvailable(forecastedAvailable.map(t => 
        t.employee_id === tech.employee_id ? {...t, assigned: true} : t
      ));
    }
    setTeam([...team, tech]);
    setError('');
  };

  const removeTech = (tech) => {
    if(tech.forecasted === false) {
      setAvailableTechs(availableTechs.map(t => 
        t.employee_id === tech.employee_id ? {...t, assigned: false} : t
      ));
    }
    if(tech.forecasted === true) {
      setForecastedAvailable(forecastedAvailable.map(t => 
        t.employee_id === tech.employee_id ? {...t, assigned: false} : t
      ));
    }
    setTeam(team.filter(m => m.employee_id !== tech.employee_id));
    setError('');
  };

  const validateTeam = () => {
    const hasEngineer = team.some(m => m.job === 'Project Engineer');
    const hasForeman = team.some(m => m.job === 'Foreman');
    
    if (!hasEngineer || !hasForeman) {
      setError('Team must include at least 1 Project Engineer and 1 Foreman');
      return false;
    }
    
    if (team.length !== 6) {
      setError('Team must have exactly 6 members');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateTeam()) {
      alert('Team successfully assigned!');
    }
  };

  const handleSelect = (e) => {
    setFilter(e.target.value)
  }

  const toggleTechView = () => {
    setTechView(techView === 'available' ? 'forecasted' : 'available');
  };

  if(isLoading){
    return (
            <div className="Content ProjectPage">
                <div className="Loading">
                    <p>Data is Loading...</p>
                    <Grid size="60" speed="1.5" color="rgba(84, 176, 210, 1)" />
                </div>
            </div>
        )
  }

  return (
    <div className='Content AssignTeam'>
      {console.log(availableTechs)}
      <h2>Assign Team Members for {foundProject.lift_name}</h2>
      <p className="instructions">
        Build a 6-person team with at least 1 Project Engineer and 1 Foreman
      </p>
           
      <div className="team-builder">
        <div className="available-techs">
          <div className="tech-view-toggle">
            <h3>
              {techView === 'available' ? 'Available Technicians' : 'Forecasted Technicians'}
            </h3>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={techView === 'forecasted'}
                onChange={toggleTechView}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <input 
            type="radio" 
            id="ProjectEngineer" 
            name="Filter"
            value="Project Engineer" 
            onChange={handleSelect}
          />
          <label htmlFor="ProjectEngineer">Project Engineer</label>
          <input 
            type="radio" 
            id="Foreman"
            name="Filter" 
            value="Foreman" 
            onChange={handleSelect}
          />
          <label htmlFor="Foreman">Foreman</label>
          <input 
            type="radio" 
            id="Technician"
            name="Filter" 
            value="Technician" 
            onChange={handleSelect}
          />
          <label htmlFor="Technician">Technician</label>
          <input 
            type="radio" 
            id="All"
            name="Filter" 
            value="" 
            onChange={handleSelect}
          />
          <label htmlFor="All">All</label>
          
          {isLoading ? (
            <Grid size="60" speed="1.5" color="rgba(84, 176, 210, 1)" />
          ) : (
            <table className="tech-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  techView === 'available' ? 
                  availableTechs
                  .filter(t => 
                    {
                      return(
                      filter ? !t.assigned && t.job === filter :
                      !t.assigned)
                    })
                  .map(tech => (
                    <tr key={tech.employee_id}>
                      <td>{tech.username}</td>
                      <td className={`job ${tech.job.replace(' ', '-')}`}>
                        {tech.job}
                      </td>
                      <td>
                        <button onClick={() => assignTech(tech)}>➕ Add</button>
                      </td>
                    </tr>
                  )) : (
                    forecastedAvailable
                    .filter(t => 
                    {
                      return(
                      filter ? !t.assigned && t.job === filter :
                      !t.assigned)
                    })
                    .map(tech => (
                    <tr key={tech.employee_id}>
                      <td>{tech.username}</td>
                      <td className={`job ${tech.job.replace(' ', '-')}`}>
                        {tech.job}
                      </td>
                      <td>
                        <button onClick={() => assignTech(tech)}>➕ Add</button>
                      </td>
                    </tr>
                  ))
                  )
                }
               
              </tbody>
            </table>
          )}
        </div>

        <div className="current-team">
          <h3>Current Team ({team.length}/6)</h3>
          {team.length === 0 ? (
            <p className="empty-team">No members assigned yet</p>
          ) : (
            <table className="tech-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {team.map(tech => (
                  <tr key={tech.employee_id}>
                    <td>{tech.username}</td>
                    <td className={`job ${tech.job.replace(' ', '-')}`}>
                      {tech.job}
                    </td>
                    <td>
                      <button onClick={() => removeTech(tech)}>❌ Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="job-counts">
            <div className="count">
              <span>Project Engineers:</span>
              <span>{team.filter(m => m.job === 'Project Engineer').length}</span>
            </div>
            <div className="count">
              <span>Foremen:</span>
              <span>{team.filter(m => m.job === 'Foreman').length}</span>
            </div>
            <div className="count">
              <span>Technicians:</span>
              <span>{team.filter(m => m.job === 'Technician').length}</span>
            </div>
          </div>
        </div>

      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        className="submit-btn" 
        onClick={handleSubmit}
        disabled={team.length !== 6}
      >
        Assign Team
      </button>
    </div>
  );
};

export default AssignTeam;