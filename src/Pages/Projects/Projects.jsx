import React from 'react'
import { Outlet, Link, Routes, Route, useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy'
import ProjectList from '../../components/Project/ProjectList'

const Projects = () => {

  const projects = useStoreState(state => state.projects)
  return (
    <div className='Content ProjectMenu'>
      Projects
      <div>
        <Link to="create">
          <button>Add New Project</button>
        </Link>
      </div>

      <div className="project-table-header">
        <div className="table-row header-row">
          <div className="table-cell">Project Name</div>
          <div className="table-cell">Created Date</div>
          <div className="table-cell">Progress</div>
          <div className="table-cell">Status</div>
        </div>
      </div>

      <div>
          <ProjectList projects={projects}/>
      </div>
    </div>
  )
}

export default Projects