import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useParams } from 'react-router-dom'

const TechnicianInfo = () => {

    const { empId } = useParams()
    const employeeId = useStoreState(state => state.employeeId)

    const searchSetEmployee = useStoreActions(actions => actions.searchSetEmployee)
    const { username, job, hire_date } = searchSetEmployee(empId)
    console.log(searchSetEmployee(empId))
    return (
        <div className="Content TechnicianInfo">
            <h2>{username}</h2>
            <h2>{hire_date}</h2>
            <h2>{job}</h2>
            <div>Assign Projectj:</div>
        </div>
    )
}

export default TechnicianInfo