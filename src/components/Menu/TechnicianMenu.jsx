import { MdDashboard } from "react-icons/md"
import { MdHomeRepairService } from "react-icons/md"
import { IoPerson } from "react-icons/io5"
import { RiTeamFill } from "react-icons/ri"
import { GoProjectRoadmap } from "react-icons/go";
import { IoIosDocument } from "react-icons/io";
import { useNavigate, Routes, Route } from 'react-router-dom';
import { BiSolidLogOut } from "react-icons/bi"


const TechnicianMenu = () => {
  const navigate = useNavigate()
  return (
    <>
        <ul>
            <li>
              <MdDashboard style={{ color: 'white' }}/>
              <a href="#" onClick={(e) => {
                  e.preventDefault();
                  navigate('/dashboard');
                  console.log('navigate to dashboard')
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
        </ul>

        <div className="Logout"><span><BiSolidLogOut /></span>Log Out</div>
    </>
  )
}

export default TechnicianMenu