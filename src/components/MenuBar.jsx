import { MdDashboard } from "react-icons/md"
import { MdHomeRepairService } from "react-icons/md"
import { IoPerson } from "react-icons/io5"
import { RiTeamFill } from "react-icons/ri"
import { GoProjectRoadmap } from "react-icons/go";
import { IoIosDocument } from "react-icons/io";
import { useNavigate, Routes, Route } from 'react-router-dom';
import { BiSolidLogOut } from "react-icons/bi"
import Dashboard from "./Dashboard";

const MenuBar = ({menuToggle}) => {
  const navigate = useNavigate();
  return (
    <div className={`Menu${!menuToggle ? '' : ' Hidden'}`}>
        <ul>
            <li>
              <MdDashboard style={{ color: 'white' }}/>
              <a href="#" onClick={(e) => {
                  e.preventDefault();
                  navigate('/dashboard');
                }}>Dashboard</a>
            </li>
            <li>
              <IoPerson style={{ color: 'white' }}/>
              <a href="">Technician</a>
            </li>
            <li>
              <MdHomeRepairService style={{ color: 'white' }}/>
              <a href="">PMS</a>
            </li>
            <li>
              <GoProjectRoadmap style={{ color: 'white' }}/>
              <a href="">Projects</a>
            </li>
            <li>
              <RiTeamFill style={{ color: 'white' }}/>
              <a href="">View Teams</a>
            </li>
            <li>
              <IoIosDocument style={{ color: 'white' }}/>
              <a href="">Baby Book</a>
            </li>
        </ul>

        <div className="Logout"><span><BiSolidLogOut /></span>Log Out</div>
    </div>
  )
}

export default MenuBar