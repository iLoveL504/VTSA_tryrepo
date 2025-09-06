import { Gantt, WillowDark, Willow } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import "../gantt-custom.css"
import MyGanttComponent from "../outComponent/GANTT_CHART/GanttChart.jsx";
import { useParams } from 'react-router-dom';

const ScheduleProjects = () => {
  const { projId } = useParams()
  return (
  <div className='Content ScheduleProject'>
    <div>
      <MyGanttComponent id={projId}/>
    </div>
  </div>
  )

};

export default ScheduleProjects;