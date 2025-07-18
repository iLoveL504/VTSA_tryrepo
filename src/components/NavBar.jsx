import { useState } from 'react'
import { IoMdMenu } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import { IoIosNotifications } from "react-icons/io";
import useToggle from '../hooks/useToggle';

const NavBar = ({ invertMenuToggle }) => {
  const [notifToggle, invertNotifToggle] = useToggle();
  const [notifs, setNotifs] = useState(0);
  const handleNotif = () => {
    setNotifs(prev => prev + 1);
  }
  return (
    <nav>
      <div onClick={() => invertMenuToggle() } className="Menu-icon">
        <IoMdMenu size={40} style={{ color: 'white' }}/>
      </div>
      <div onClick={() => handleNotif()}>Click me</div>
      <div onClick={() => invertNotifToggle()} className="Notification-Icon">
        <IoIosNotifications className="BellIcon" size={40} style={{ color: 'white' }}/>
        
        {notifs !== 0 && <div className="Notifications">{notifs}</div>}
        <div className={`NotificationList ${notifToggle ? ' Hidden' : ''}`}>
          <div>
           
              <ul>
                <li>
                  <h4>New Problem!</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur reiciendis </p>
                </li>
                <li>
                  <h4>New Problem!</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur reiciendis </p>
                </li>
                <li>
                  <h4>New Problem!</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur reiciendis </p>
                </li>
                <li>
                  <h4>New Problem!</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur reiciendis </p>
                </li>
                <li>
                  <h4>New Problem!</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur reiciendis </p>
                </li>
                <li>
                  <h4>New Problem!</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur reiciendis </p>
                </li>
                <li>
                  <h4>New Problem!</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur reiciendis </p>
                </li>
                <li>
                  <h4>New Problem!</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur reiciendis </p>
                </li>
              </ul>
            
          </div>
        </div>

      </div>
      <div className="Profile-Icon">
        <CgProfile size={40} style={{ color: 'white', marginLeft: "40px" }}/>
        <h3>Justin Atienza</h3>
      </div>
      
       
    </nav>
  )
}

export default NavBar