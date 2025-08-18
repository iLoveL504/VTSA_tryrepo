import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { dividerClasses } from '@mui/material'

const ProjectInfo = () => {

    const { projId } = useParams()
    const projects = useStoreState(state => state.projects)
    const searchSetProject = useStoreActions(actions => actions.searchSetProject)
    // const p  = searchSetProject(projId)
    // const { lift_name, description, shaft_size } = p
    const {lift_name, description, shaft_size} = searchSetProject(projId)
    useEffect(() => {
        
        console.log(lift_name)
    })

    return (
        <div className='Content ProjectINfo'>
            <h3>{lift_name}</h3>
            <p>{description}</p>
            <p>{shaft_size}</p>
            <p>Team:</p>
        </div>
    )
}

export default ProjectInfo