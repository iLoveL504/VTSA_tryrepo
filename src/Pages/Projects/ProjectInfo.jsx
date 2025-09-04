import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'
import { useNavigate } from 'react-router-dom' 
import { Axios } from '../../api/axios.js'
import useFormValidate from '../../hooks/useFormValidate'

const ProjectInfo = () => {
    const navigate = useNavigate()
    const { projId } = useParams()
    const numId = Number(projId)
    const projects = useStoreState(state => state.projects)
    const proj = projects.find(p => p.id === numId)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({})
    const isProjectsReady = Array.isArray(projects) && projects.length > 0;
    const fetchUrl = proj && isProjectsReady ? `http://localhost:4000/teams/${proj.team_id}` : null;
    const [teamInfo, teamFetchError, teamIsLoading] = useAxiosFetch(fetchUrl);

    const team = teamInfo && teamInfo.length > 0 ? teamInfo[0] : null;
    const teamMembers = team ? team.members : null;

    useEffect(() => {
        if (proj !== undefined) {
            setFormData(proj)
            setIsLoading(false)
        }
    }, [proj, formData])

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
        setErrors,
        handleInputChange,
        handleNumberInputChange,
        handleBlur,
        handleSubmit,
        values,
        setValues,
        saveStatus,
        setSaveStatus
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


    const handleCancel = () => {
        setValues(proj)
        setErrors({})
        setIsEditing(false)
        setSaveStatus('')
    }


    if (isLoading) {
        return (
            <div className="Content ProjectPage">
                <div className="Loading">
                    <p>Data is Loading...</p>
                    <Grid size="60" speed="1.5" color="rgba(84, 176, 210, 1)" />
                </div>
            </div>
        )
    }
   
    return (
        
        <div className="Content ProjectPage">
            {console.log(proj)}
            <div className="project-header">
                <h2>Project Details</h2>
                <div className="action-buttons">
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    ) : (
                        <>
                            <button onClick={handleSubmit(handleSave)} disabled={saveStatus === 'saving'}>
                                {saveStatus === 'saving' ? 'Saving...' : 'Save'}
                            </button>
                            <button onClick={handleCancel}>Cancel</button>
                        </>
                    )}
                </div>
            </div>

            {saveStatus === 'success' && <div className="status success">Project updated successfully!</div>}
            {saveStatus === 'error' && <div className="status error">Error updating project</div>}

            <div className="project-form">
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-row">
                        <label>Lift Name:</label>
                        <input
                            type="text"
                            name="lift_name"
                            value={values.lift_name || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            onBlur={handleBlur}
                        />
                        {errors && <span className='missing'>{errors.lift_name}</span>}
                    </div>
                    <div className="form-row">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={values.description || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            onBlur={handleBlur}
                            rows={3}
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Specifications</h3>
                    <div className="form-grid">
                        <div className="form-row">
                            <label>Capacity:</label>
                            <input
                                type="number"
                                name="cap"
                                value={values.cap || ''}
                                onChange={handleNumberInputChange}
                                disabled={!isEditing}
                                onBlur={handleBlur}
                            />
                            {errors && <span className='missing'>{errors.cap}</span>}
                        </div>
                        <div className="form-row">
                            <label>Speed:</label>
                            <input
                                type="number"
                                name="speed"
                                value={values.speed || ''}
                                onChange={handleNumberInputChange}
                                disabled={!isEditing}
                                onBlur={handleBlur}
                            />
                            {errors && <span className='missing'>{errors.speed}</span>}
                        </div>
                        <div className="form-row">
                            <label>Stops:</label>
                            <input
                                type="number"
                                name="stops"
                                value={values.stops || ''}
                                onChange={handleNumberInputChange}
                                disabled={!isEditing}
                                onBlur={handleBlur}
                            />
                            {errors && <span className='missing'>{errors.stops}</span>}
                        </div>
                        <div className="form-row">
                            <label>Travel:</label>
                            <input
                                type="text"
                                name="travel"
                                value={values.travel || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                onBlur={handleBlur}
                            />
                            {errors && <span className='missing'>{errors.travel}</span>}
                        </div>
                        <div className="form-row">
                            <label>Overhead Height:</label>
                            <input
                                type="number"
                                name="overhead_height"
                                value={values.overhead_height || ''}
                                onChange={handleNumberInputChange}
                                disabled={!isEditing}
                                onBlur={handleBlur}
                            />
                            {errors && <span className='missing'>{errors.overhead_height}</span>}
                        </div>
                        <div className="form-row">
                            <label>Pit Depth:</label>
                            <input
                                type="number"
                                name="pit_depth"
                                value={values.pit_depth || ''}
                                onChange={handleNumberInputChange}
                                disabled={!isEditing}
                                onBlur={handleBlur}
                            />
                            {errors && <span className='missing'>{errors.pit_depth}</span>}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Team Information</h3>
                    {teamIsLoading ? (
                        <Grid size="40" speed="1.5" color="rgba(84, 176, 210, 1)" />
                    ) : teamInfo[0] === undefined ? (
                        <>
                            <p>No team assigned</p>
                            <button onClick={() => navigate(`/projects/${proj.id}/team`)}>Assign Team</button>
                        </>
                    ) : (
                        <>
                            <div className="form-row">
                                <label>Team Name:</label>
                                <span>{teamInfo[0][0].team_name}</span>
                            </div>
                            <div className="form-row">
                                {console.log(teamInfo[0])}
                                <label>Team Members:</label>
                                <div className="team-members">
                                    {teamInfo[0].map((member, index) => (
                                        <span key={index} className="member-tag"
                                         onClick={
                                            () => navigate(`/technician/${member.employee_id}`)
                                         }
                                         style={{'cursor': 'pointer'}}
                                         >
                                            {member.username}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="form-section">
                    <h3>Dates</h3>
                    <div className="form-grid">
                        <div className="form-row">
                            <label>Created At:</label>
                            <span>{new Date(values.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="form-row">
                            <label>Manufacturing End:</label>
                            <input
                                type="date"
                                name="manufacturing_end_date"
                                value={values.manufacturing_end_date ? values.manufacturing_end_date.split('T')[0] : ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className="form-row">
                            <label>Project End:</label>
                            <input
                                type="date"
                                name="project_end_date"
                                value={values.project_end_date ? values.project_end_date.split('T')[0] : ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfo