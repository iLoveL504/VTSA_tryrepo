import AdminMenu from "../Menu/AdminMenu";
import ProjectEngineerMenu from "../Menu/ProjectEngineerMenu";
import ForemanMenu from "../Menu/ForemanMenu"
import ProjectManagerMenu from "../Menu/ProjectManagerMenu";
import PMSCoordinatorMenu from "../Menu/PMSCoordinatorMenu";
import PMSTechnicianMenu from "../Menu/PMSTechnicianMenu";
import InstallerMenu from "../Menu/InstallerMenu";
import { useStoreState } from "easy-peasy";

const MenuBar = ({ menuToggle }) => {
const user = sessionStorage.getItem('roles');

return (
  <div className={`Menu${!menuToggle ? '' : ' Hidden'}`}>
    {
      user === "manager" ? <AdminMenu /> :
      user === "Project Manager" ? <AdminMenu /> :
      user === "Project Engineer" ? <ProjectEngineerMenu /> :
      user === "Foreman" ? <ForemanMenu /> :
      user === "Technician" ? <InstallerMenu /> :
      user === "PMS Manager" ? <PMSCoordinatorMenu /> :
      user === "PMS Technician" ? <PMSTechnicianMenu /> :
      <AdminMenu/>
    }
  </div>
);
}

export default MenuBar