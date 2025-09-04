import { Gantt} from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import { React, useRef, useEffect} from "react";
import { Willow } from "wx-react-gantt";
import { tasks } from "./GanttData.jsx";
import { columns, links, scales, taskTypes } from "./ganttComponents.jsx";

const MyGanttComponent = () => {
  const apiRef = useRef();
  const scaleHeightRef = useRef(50);

  /* Makes the "summary" task type not draggable */
  useEffect(() => {
    if (apiRef.current) {
        apiRef.current.intercept("drag-task", ({ id, top }) => {
            return !(typeof top === "undefined" && apiRef.current.getTask(id).type === "summary");
      });
    }
  }, [apiRef.current]);

  /* allows the chart to be zoomed in and out */
  useEffect(() => {
    if (apiRef.current) {
      apiRef.current.on("zoom-scale", () => {
        console.log("The current zoom level is", apiRef.current.getState().zoom);
      });
    }
  }, [apiRef.current]);

 const readonly = true; 

  return (
    <div className="gt-cell">
      <Willow>
        <Gantt 
          readonly={readonly}
          apiRef={apiRef} 
          links={links} 
          scales={scales}
          scaleHeight={scaleHeightRef.current} 
          columns={columns} 
          tasks={tasks} 
          taskTypes={taskTypes} 
          init={(api) => (apiRef.current = api)}
          zoom
        />
      </Willow>
    </div>  
  );
};
export default MyGanttComponent;