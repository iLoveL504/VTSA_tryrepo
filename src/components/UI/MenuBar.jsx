import AdminMenu from "../Menu/AdminMenu";
import TechnicianMenu from "../Menu/TechnicianMenu";
import { useStoreState } from "easy-peasy";

const MenuBar = ({ menuToggle }) => {
const user = sessionStorage.getItem('roles');

return (
  <div className={`Menu${!menuToggle ? '' : ' Hidden'}`}>
    {
      user === "manager" ? <AdminMenu /> :
      user === "Project Manager" ? <AdminMenu /> :
      user === "Project Engineer" ? <TechnicianMenu /> :
      user === "Foreman" ? <AdminMenu /> :
      user === "Installer" ? <AdminMenu /> :
      user === "PMS Manager" ? <AdminMenu /> :
      user === "PMS Technician" ? <AdminMenu /> :
      <AdminMenu/>
    }
  </div>
);
}

export default MenuBar