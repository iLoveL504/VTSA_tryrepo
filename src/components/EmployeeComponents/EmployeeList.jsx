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
                console.log('dddd')
            }, 1000
        )
    }, [])
    return (
        <>  
               
            {
                load ? (
                    <Grid
                        size="60"
                        speed="1.5"
                        color="rgba(84, 176, 210, 1)" 
                    />
                        ) :
                employees.map(employee => (
                    <Employee employee={employee} key={employee.employee_id}/>
                ))
                
            }
        </>
    )
}

export default EmployeeList