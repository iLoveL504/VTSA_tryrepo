import { createStore, action, thunk, computed } from "easy-peasy"
import {Axios} from '../api/axios.js'
const d = new Date()
const date = d.toISOString().split('T')[0]

export default createStore({
    date: date,
    user: { username: null, roles: null },
    setUser: action((state, payload) => {
        state.user.username = payload.username
        state.user.roles = payload.roles
    }),
    isLoggedIn: false,
    setIsLoggedIn: action((state, payload) => {
        state.isLoggedIn = payload
    }),
    employees: [],
    setEmployees: action((state, payload) => {
        state.employees = payload
        state.searchResults = payload
    }),
    notifications: [],
    setNotifications: action((state, payload) => {
        state.notifications = payload
    }),
    addNotificationToState: action((state, payload) => {
    state.notifications.push(payload)
    }),
    isLoading: false,
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
    }),
    searchSetProject: thunk((actions, payload, helpers) => {
        const { getState } = helpers;
        const state = getState()
        const pId = Number(payload)
        
        const proj = state.projects.find(p => p.id === pId);
        console.log(proj)
        return proj
    }),
    addNotification: thunk(async (actions, payload, helpers) => {
        await Axios.post('/notifications', {notification: 'created'})
        await Axios.post('/notifications/distribute', {jobs: 'manager'})
    })
})
