import React, { useState } from 'react';

const AssignTeam = () => {
  // Sample list of available technicians
  const [availableTechs, setAvailableTechs] = useState([
    { id: 1, name: 'John Doe', role: 'Project Engineer', assigned: false },
    { id: 2, name: 'Jane Smith', role: 'Foreman', assigned: false },
    { id: 3, name: 'Mike Johnson', role: 'Technician', assigned: false },
    { id: 4, name: 'Sarah Williams', role: 'Technician', assigned: false },
    { id: 5, name: 'David Brown', role: 'Technician', assigned: false },
    { id: 6, name: 'Emily Davis', role: 'Technician', assigned: false },
    { id: 7, name: 'Robert Wilson', role: 'Project Engineer', assigned: false },
    { id: 8, name: 'Lisa Taylor', role: 'Technician', assigned: false },
    { id: 9, name: 'John Mayer', role: 'Project Engineer', assigned: false },
    { id: 10, name: 'Taylor Swift', role: 'Foreman', assigned: false },
    { id: 11, name: 'Christ Pratt', role: 'Project Engineer', assigned: false },
    { id: 12, name: 'Joe Odagiri', role: 'Foreman', assigned: false }
  ]);

  const [team, setTeam] = useState([]);
  const [error, setError] = useState('');

  const assignTech = (tech) => {
    if (team.length >= 6) {
      setError('Team is already full (6 members max)');
      return;
    }

    // Check if adding would exceed role limits
    if (tech.role === 'Project Engineer' && 
        team.filter(m => m.role === 'Project Engineer').length >= 1) {
      setError('Maximum 1 Project Engineer allowed');
      return;
    }

    if (tech.role === 'Foreman' && 
        team.filter(m => m.role === 'Foreman').length >= 2) {
      setError('Maximum 2 Foremen allowed');
      return;
    }

    setAvailableTechs(availableTechs.map(t => 
      t.id === tech.id ? {...t, assigned: true} : t
    ));
    setTeam([...team, tech]);
    setError('');
  };

  const removeTech = (tech) => {
    setAvailableTechs(availableTechs.map(t => 
      t.id === tech.id ? {...t, assigned: false} : t
    ));
    setTeam(team.filter(m => m.id !== tech.id));
    setError('');
  };

  const validateTeam = () => {
    const hasEngineer = team.some(m => m.role === 'Project Engineer');
    const hasForeman = team.some(m => m.role === 'Foreman');
    
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
      // Here you would typically send the team data to your backend
    }
  };

  return (
    <div className='Content AssignTeam'>
      <h2>Assign Team Members</h2>
      <p className="instructions">
        Build a 6-person team with at least 1 Project Engineer and 1 Foreman
      </p>
      
      <div className="team-builder">
        <div className="available-techs">
          <h3>Available Technicians</h3>
          <ul>
            {availableTechs.filter(t => !t.assigned).map(tech => (
              <li key={tech.id} onClick={() => assignTech(tech)}>
                <span className="name">{tech.name}</span>
                <span className={`role ${tech.role.replace(' ', '-')}`}>{tech.role}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="current-team">
          <h3>Current Team ({team.length}/6)</h3>
          {team.length === 0 ? (
            <p className="empty-team">No members assigned yet</p>
          ) : (
            <ul>
              {team.map(tech => (
                <li key={tech.id} onClick={() => removeTech(tech)}>
                  <span className="name">{tech.name}</span>
                  <span className={`role ${tech.role.replace(' ', '-')}`}>{tech.role}</span>
                </li>
              ))}
            </ul>
          )}
          
          <div className="role-counts">
            <div className="count">
              <span>Project Engineers:</span>
              <span>{team.filter(m => m.role === 'Project Engineer').length}</span>
            </div>
            <div className="count">
              <span>Foremen:</span>
              <span>{team.filter(m => m.role === 'Foreman').length}</span>
            </div>
            <div className="count">
              <span>Technicians:</span>
              <span>{team.filter(m => m.role === 'Technician').length}</span>
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