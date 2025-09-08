// src/pages/ProjectProgress.jsx
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useStoreState } from 'easy-peasy'
import MyGanttComponent from '../../outComponent/GANTT_CHART/GanttChart.jsx'
import UniverSpreadsheet from '../../spreadsheet-components/spreadsheet.jsx'
// import DailyTasks from '../components/DailyTasks'
import "wx-react-gantt/dist/gantt.css";
import "../../gantt-custom.css"

const ProjectProgress = () => {
    const { projId } = useParams()
    const numId = Number(projId)
    const projects = useStoreState(state => state.projects)
    const proj = projects.find(p => p.id === numId)
    const [activeTab, setActiveTab] = useState('gantt')
    const [payload, setPayload] = useState({})

    if (!proj) {
        return <div>Project not found</div>
    }

    return (
        <div className="Content ProjectProgress">
            <div className="progress-header">
                <h2>Project Progress - {proj.lift_name}</h2>
                <div className="tabs">
                    <button 
                        className={activeTab === 'gantt' ? 'active' : ''}
                        onClick={() => setActiveTab('gantt')}
                    >
                        Gantt Chart
                    </button>
                    <button 
                        className={activeTab === 'accomplishment' ? 'active' : ''}
                        onClick={() => setActiveTab('accomplishment')}
                    >
                        Accomplishment Report
                    </button>
                    <button 
                        className={activeTab === 'tasks' ? 'active' : ''}
                        onClick={() => setActiveTab('tasks')}
                    >
                        Daily Tasks
                    </button>
                </div>
            </div>
            <div className="progress-content">
                {activeTab === 'gantt' && <MyGanttComponent id={projId} setPayload={setPayload}/>}
                {activeTab === 'accomplishment' && <UniverSpreadsheet />}
                {activeTab === 'tasks' && <DailyTasks projectId={numId} />}
            </div>
        </div>
    )
}

export default ProjectProgress