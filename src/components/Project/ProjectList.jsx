import React, { useEffect, useState } from 'react'
import Project from './Project'
import { useStoreState } from 'easy-peasy'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import { Grid } from 'ldrs/react'

const ProjectList = ({projects}) => {
  const user = useStoreState(state => state.user)
  const empId = sessionStorage.getItem('id')
  console.log(projects)
  const [designatedProject, designatedFetchError, designatedIsLoading] = useAxiosFetch(`http://localhost:4000/employees/${empId}/designated-project`)
  const [lowRole, setLowRole] = useState(true)
  console.log(lowRole)
  useEffect(() => {
    if (sessionStorage.getItem('roles') === 'manager' ||
      sessionStorage.getItem('roles') == 'Project Manager') {
        setLowRole(false)
      }
  }, [])

  const projList = () => (
    projects.map(p => (
                <Project project={p} key={p.id}/>
            ))
  )

  const test = () => (
    <div>hiii</div>
  )


    if (designatedIsLoading) {
        return (
                <div className="Loading">
                    <p>Data is Loading...</p>
                    <Grid size="60" speed="1.5" color="rgba(84, 176, 210, 1)" />
                </div>
        )
    }

  return (
    <div className='ProjectList'>  
        
        {
            sessionStorage.getItem('roles') === 'manager' ||
            sessionStorage.getItem('roles') === 'Project Manager'  ?
            (
               projects.map(p => (
                  <Project project={p} key={p.id}/>
                ))
            )
            :  (  
                designatedProject.map(p => (
                  <Project project={p} key={p.id}/>
                ))
            )
        }
    </div>
  )
}

export default ProjectList