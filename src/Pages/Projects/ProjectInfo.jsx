import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'
import { Axios } from '../../api/axios.js'
import useFormValidate from '../../hooks/useFormValidate'
import useFindProjectTask from '../../utils/FindProjectTask.js'
import "wx-react-gantt/dist/gantt.css";
import "../../gantt-custom.css"
import ProjectDetails from './ProjectDetails.jsx'
import ProjectProgress from './ProjectProgress.jsx'
import ScheduleProject from './ScheduleProject.jsx'
import DailyTasks from './DailyTasks.jsx'


const ProjectInfo = () => {
    const [activePage, setActivePage] = useState('details')
    const navigate = useNavigate()
    const { projId } = useParams()
    const numId = Number(projId)
    const projects = useStoreState(state => state.projects)
    const proj = projects.find(p => p.id === numId)
    const dateNow = useStoreState(state => state.date)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({})
    const [currentTask, tasksFetchError, tasksIsLoading, allTaskDates, findReverseTaskName] = useFindProjectTask(dateNow, projId)
    const isProjectsReady = Array.isArray(projects) && projects.length > 0;
    const fetchUrl = proj && isProjectsReady ? `http://localhost:4000/teams/${proj.id}` : null;
    const [teamInfo, teamFetchError, teamIsLoading] = useAxiosFetch(fetchUrl);
    const [payload, setPayload] = useState({})
    const team = teamInfo && teamInfo.length > 0 ? teamInfo[0] : null;
    const teamMembers = team ? team.members : null;
    console.log(allTaskDates)
     const validate = (values) => {
        let errors = {}

        if(values.lift_name === '') {
            errors.lift_name = 'Lift name is missing'
        }
        if(values.cap === '') {
            errors.cap = 'Capacity is missing'
        }
        if(values.speed === '') {
            errors.speed = 'Speed is missing'
        }
        if(values.stops === '') {
            errors.stops = 'Stops is missing'
        }
        if(values.travel === '') {
            errors.travel = 'Travel is missing'
        }
        if(values.overhead_height === '') {
            errors.overhead_height = 'Overhead height is missing'
        }
        if(values.pit_depth === '') {
            errors.pit_depth = 'Pit depth is missing'
        }

        return errors
    }
        const {
            errors,
            handleInputChange,
            handleNumberInputChange,
            handleBlur,
            handleSubmit,
            values,
            saveStatus,
            setSaveStatus,
            setValues,
            setErrors
         } = useFormValidate(formData, validate)

    const handleSave = async () => {
        try {
            setSaveStatus('saving')
            await Axios.put(`/projects/${numId}`, values)
            setSaveStatus('success')
            setTimeout(() => setSaveStatus(''), 2000)
            setIsEditing(false)
            window.location.reload()
            // Optionally refresh the project data here
        } catch (error) {
            console.error('Error updating project:', error)
            setSaveStatus('error')
            setTimeout(() => setSaveStatus(''), 2000)
        }
    }

    const schedOnClick = () => {
        setActivePage('schedule')
    }
    const tasksOnClick = () => {
        setActivePage('tasks')
    }

    const handleCancel = () => {
        setValues(proj)
        setErrors({})
        setIsEditing(false)
        setSaveStatus('')
    }

    const progressOnClick = () => {
         setActivePage(`progress`)
    }


   
    return (
        
        <div className="Content ProjectPage">
            <div className="project-header">
                <h2>{values.lift_name}</h2>
                <div className="action-buttons">
                    <button onClick={() => setActivePage('details')}>Details</button>
                    <button onClick={schedOnClick}>Schedule</button>
                    <button onClick={progressOnClick}>Progress</button>

                </div>
            </div>
            {
                activePage === 'details' && 
                <ProjectDetails 
                    currentTask={currentTask}
                    proj={proj}
                    setFormData={setFormData}
                    setIsLoading={setIsLoading}
                    formData={formData}
                    teamInfo={teamInfo}
                    isLoading={isLoading}
                    teamIsLoading={teamIsLoading}
                    tasksIsLoading={tasksIsLoading}
                    saveStatus={saveStatus}
                    handleSave={handleSave}
                    isEditing={isEditing}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    handleNumberInputChange={handleNumberInputChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    tasksFetchError={tasksFetchError}
                    values={values}
                    setIsEditing={setIsEditing}
                    handleCancel={handleCancel}
                    findReverseTaskName={findReverseTaskName}
                />
            }
            {
                activePage === 'progress' &&
                <ProjectProgress allTaskDates={allTaskDates} tasksIsLoading={tasksIsLoading} projId={projId}/>
            }
            {
                activePage === 'schedule' &&
                <ScheduleProject projId={projId} allTaskDates={allTaskDates}/>
            }
        {}
            
        </div>
    )
}


export default ProjectInfo