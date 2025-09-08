import { Gantt, WillowDark, Willow } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import "../gantt-custom.css"
import MyGanttComponent from "../outComponent/GANTT_CHART/GanttChart.jsx";
import { useParams } from 'react-router-dom';
import { Axios } from '../api/axios.js'
import { useState } from 'react'

const ScheduleProjects = () => {
  const { projId } = useParams()
  const [payload, setPayload] = useState({})

  const handleClick = async () => {
    console.log(payload)
    await Axios.post(`/projects/schedule/${projId}`, payload)
  }

  return (
  <div className='Content ScheduleProject'>
    <button onClick={handleClick}>Make Schedule</button>
    <div>
      <MyGanttComponent id={projId} setPayload={setPayload}/>
    </div>
  </div>
  )

};

export default ScheduleProjects;