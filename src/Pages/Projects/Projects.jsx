import React from 'react'
import { Outlet, Link, Routes, Route, useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy'
import ProjectList from '../../components/ProjectComponents/ProjectList'

const Projects = () => {

  const projects = useStoreState(state => state.projects)
  console.log(projects)
  return (
    <div className='Content ProjectMenu'>
      Projects
      <div>
        <Link to="create">
          <button>Add New Project</button>
        </Link>
        
      </div>
      <div>
          <ProjectList projects={projects}/>
      </div>
    </div>
  )
}

export default Projects