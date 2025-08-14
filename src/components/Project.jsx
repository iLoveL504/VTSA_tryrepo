import React from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Project = ({project}) => {
  return (
    <div className='ProjectInfo'>
      {project.lift_name}
      <p>{project.created_at}</p>
      <p>{project.progress}%</p>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={project.progress} />          
        </Box>
      <p className={`status-${project.status === 'active' ? 'active' : 
        project.status === 'inactive' ? 'inactive' : 'completed'
      }`}>{project.status}</p>
    </div>

  )
}

export default Project