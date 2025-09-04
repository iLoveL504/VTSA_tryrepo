import React from 'react'
import Project from './Project'
import { useStoreState } from 'easy-peasy'

const ProjectList = ({projects}) => {
  const user = useStoreState(state => state.user)
  return (
    <div className='ProjectList'>  
        {
            projects.map(p => (
                <Project project={p} key={p.id}/>
            ))
        }
    </div>
  )
}

export default ProjectList