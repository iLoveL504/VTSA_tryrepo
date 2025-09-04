import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'
import { useStoreState, useStoreActions } from 'easy-peasy'
// Default values shown

import {Axios} from '../../api/axios'
import EmployeeList from '../../components/Employee/EmployeeList'

const Technician = () => {
    // const [ searchEmployee, setSearchEmployee ] = useState('')
    // const [ searchResults, setSearchResults ] = useState([])
    // const [ employees, setEmployees ] = useState([])
    // const [ isLoading, setIsLoading ] = useState(true)
    const searchEmployee = useStoreState((state) => state.searchEmployee)
    const setSearchEmployee = useStoreActions((actions) => actions.setSearchEmployee)
    const searchResults = useStoreState((state) => state.searchResults)
    const setSearchResults = useStoreActions((actions) => actions.setSearchResults)
    const employees = useStoreState((state) => state.employees)
    const setEmployees = useStoreActions((actions) => actions.setEmployees)
    const isLoading = useStoreState((state) => state.isLoading)
    const setIsLoading = useStoreActions((actions) => actions.setIsLoading)
    

    const sortedSearch = useStoreState((state) => state.sortResults)
    useEffect(() => {
        setSearchResults(employees)
    }, [])

    useEffect(() => {
        setSearchResults(sortedSearch)
    }, [searchEmployee])

    
    return (
        <div className="Content TechnicianMenu">
            <form action="">
                <label htmlFor="search">Search employee</label>
                <input 
                    type="text" 
                    id='searchEmployee' 
                    value={searchEmployee}
                    onChange={(e) => {setSearchEmployee(e.target.value); console.log(e.target.value)}}
                    
                    />
                <button className="Filter">Filter Search</button>
            </form>
            <div className="Labels">
                <p>Full Name</p>
                <p>Role</p>
                <p>Status</p>
            </div>
            <div className="EmployeeList">
                <EmployeeList employees={searchResults} isLoading={isLoading}/>
            </div>
        </div>
    )
}

export default Technician