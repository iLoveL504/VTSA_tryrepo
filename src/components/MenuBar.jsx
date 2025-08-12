import AdminMenu from "./MenuList/AdminMenu";
import TechnicianMenu from "./MenuList/TechnicianMenu";
import { useStoreState } from "easy-peasy";

const MenuBar = ({ menuToggle }) => {
  const user = useStoreState((state) => state.user)
  return (
    <>
      <div className={`Menu${!menuToggle ? '' : ' Hidden'}`}>
        {user.roles === "manager" ? <AdminMenu/> 
              : user.roles ==="cook" ? <TechnicianMenu /> : <AdminMenu />}        
      </div>
    </>        
  )
}

export default MenuBar