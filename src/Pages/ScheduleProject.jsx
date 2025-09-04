import { Gantt, WillowDark, Willow } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import "../gantt-custom.css"
import MyGanttComponent from "../outComponent/GANTT_CHART/GanttChart.jsx";

const ScheduleProjects = () => {
  return (
  <div className='Content ScheduleProject'>
    <div>
      <MyGanttComponent />
    </div>
  </div>
  )

};

export default ScheduleProjects;