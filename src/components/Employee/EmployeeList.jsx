import { useState, useEffect } from 'react'
import Employee from './Employee'
import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'

const EmployeeList = ({ employees, isLoading }) => {
    const [load, isLoad] = useState(true)
    useEffect(() => {
        
        setTimeout(
            () => {
                isLoad(false)
            }, 1000
        )
    }, [])
    return (
        <>  
               
            {
                employees.map(employee => (
                    <Employee employee={employee} key={employee.employee_id}/>
                ))
                
            }
        </>
    )
}

export default EmployeeList