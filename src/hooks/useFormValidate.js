import { useState, useEffect } from 'react'

const useFormValidate = (initialState, validate) => {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState(initialState)
    const [saveStatus, setSaveStatus] = useState('')

    useEffect(() => {
        setValues(initialState)
    }, [initialState])

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({
            ...values , [name] : value
        })
    } 

    const handleNumberInputChange = (e) => {
        const {name, value} = e.target
        setValues({
            ...values , [name] : value === '' ? '' : Number(value)
        })
    }

    const handleBlur = () => {
        const validationErrors = validate(values)
        console.log(validationErrors)
        console.log(errors)
        setErrors(validationErrors)
        console.log(values)
    }

    const handleSubmit = (callback) => (e) => {
        e.preventDefault()
        const validationErrors = validate(values)
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0){
            callback()
        }
    }

    return {
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
    }
}

export default useFormValidate