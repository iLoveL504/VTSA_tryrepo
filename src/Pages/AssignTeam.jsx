import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { useParams } from 'react-router-dom';
import { Axios } from '../api/axios.js';
import useAxiosFetch from '../hooks/useAxiosFetch.js';
import 'ldrs/react/Grid.css'

const AssignTeam = () => {
  const { projId } = useParams();
  const projects = useStoreState(state => state.projects);
  const foundProject = projects.find(p => p.id === Number(projId));
  const [availableTeams, availableFetchError, availableIsLoading] = useAxiosFetch('http://localhost:4000/teams/no-project');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState('');

  // Group team members by team
  const groupTeams = (data) => {
    const teams = {};
    
    data.forEach(member => {
      if (!teams[member.team_id]) {
        teams[member.team_id] = {
          team_id: member.team_id,
          foreman_name: member.Foreman,
          foreman_id: member.foreman_id,
          project_id: member.project_id,
          members: []
        };
      }
      
      // Add member to the team (including the foreman)
      teams[member.team_id].members.push({
        employee_id: member.employee_id,
        full_name: member.full_name,
        job: member.job,
        username: member.username
      });
    });
    console.log(teams)
    return Object.values(teams);

  };

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (availableTeams && availableTeams.length > 0) {
      const groupedTeams = groupTeams(availableTeams);
      setTeams(groupedTeams);
    }
  }, [availableTeams]);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setError('');
  };

  const handleSubmit = () => {
    if (!selectedTeam) {
      setError('Please select a team');
      return;
    }
    
    // Submit the selected team to the project
    alert(`Team ${selectedTeam.foreman_name} assigned to project ${foundProject.lift_name}`);
    // Here you would make an API call to assign the team to the project
  };

  if (availableIsLoading) {
    return (
      <div className="Content ProjectPage">
        <div className="Loading">
          <p>Loading available teams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="Content TeamSelection">
      <h2>Assign Team to {foundProject.lift_name}</h2>
      <p className="instructions">
        Select a team by clicking on the foreman's name. The team members will be displayed below.
      </p>
      
      {availableFetchError && (
        <div className="error-message">Error loading teams: {availableFetchError}</div>
      )}
      
      <div className="teams-container">
        <h3>Available Teams</h3>
        <div className="teams-list">
          {teams.map(team => (
            <div 
              key={team.team_id} 
              className={`team-card ${selectedTeam && selectedTeam.team_id === team.team_id ? 'selected' : ''}`}
              onClick={() => handleTeamSelect(team)}
            >
              <div className="foreman-info">
                <h4>{team.foreman_name}</h4>
                <span className="job-tag foreman">Foreman</span>
                <span className="team-size">{team.members.length} members</span>
              </div>
              
              <div className="team-members">
                <h5>Team Members:</h5>
                <ul>
                  {team.members.map(member => (
                    <li key={member.employee_id} className="member-item">
                      <span className="member-name">{member.full_name}</span>
                      <span className={`job-tag ${member.job.replace(' ', '-').toLowerCase()}`}>
                        {member.job}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedTeam && (
        <div className="selected-team">
          <h3>Selected Team</h3>
          <div className="selected-team-card">
            <h4>{selectedTeam.foreman_name}'s Team</h4>
            <div className="team-composition">
              <div className="composition-item">
                <span className="count">{selectedTeam.members.filter(m => m.job === 'Foreman').length}</span>
                <span className="label">Foremen</span>
              </div>
              <div className="composition-item">
                <span className="count">{selectedTeam.members.filter(m => m.job === 'Project Engineer').length}</span>
                <span className="label">Engineers</span>
              </div>
              <div className="composition-item">
                <span className="count">{selectedTeam.members.filter(m => m.job === 'Technician').length}</span>
                <span className="label">Technicians</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        className="submit-btn" 
        onClick={handleSubmit}
        disabled={!selectedTeam}
      >
        Assign Selected Team
      </button>
    </div>
  );
};

export default AssignTeam;