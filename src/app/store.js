import { createStore, action, thunk, computed } from "easy-peasy"
import {Axios} from '../api/axios.js'

export default createStore({
    user: { },
    setUser: action((state, payload) => {
        state.user.username = payload.username
        state.user.roles = payload.roles
    }),
    employees: [],
    setEmployees: action((state, payload) => {
        state.employees = payload
        state.searchResults = payload
    }),
    isLoadoing: false,
    setIsLoading: action((state, payload) => {
        state.isLoading = payload
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload
    }),
    searchEmployee: '',
    setSearchEmployee: action((state, payload) => {
        state.searchEmployee = payload
    }),
    sortResults: computed((state) => {
        const sortedSearch = state.employees.filter(employee => (employee.first_name.toLowerCase())
            .includes(state.searchEmployee.toLowerCase()) || (employee.last_name.toLowerCase())
            .includes(state.searchEmployee.toLowerCase()))
        return sortedSearch
    }),
    employeeId: 4,
    setEmployeeId: action((state, payload) => {
        state.employeeId = payload
    }),
    searchSetEmployee: thunk((actions, payload, helpers) => {
        const { getState } = helpers;
        const state = getState()
        const id = Number(payload)
        const emp = state.employees.find(e => e.employee_id === id);
        return emp
    }),
    projects: [],
    setProjects: action((state, payload) => {
        state.projects = payload
    })
})
