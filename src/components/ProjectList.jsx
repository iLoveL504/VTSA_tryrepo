import React from 'react'
import Project from './Project'

const ProjectList = ({projects}) => {
  return (
    <>  
        {
            projects.map(p => (
                <Project project={p} key={p.id}/>
            ))
        }
    </>
  )
}

export default ProjectList