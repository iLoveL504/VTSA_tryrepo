import React from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom'

const Project = ({project}) => {

  const navigate = useNavigate()

  return (
    <div className='ProjectInfo' onClick={() => navigate(`/projects/${project.id}`)}>
      {project.lift_name}
      <p>{project.created_at}</p>
      <p>{project.progress}%</p>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={project.progress} />          
        </Box>
      <p className={`status-${project.status === 'active' ? 'active' : 
        project.status === 'inactive' ? 'inactive' : 'manufacturing'
      }`}>{project.status}</p>
    </div>

  )
}

export default Project