import { useState } from 'react'
import { IoMdMenu } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import { IoIosNotifications } from "react-icons/io";
import useToggle from '../hooks/useToggle';
import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'
import { useStoreState } from 'easy-peasy'

const NavBar = ({ invertMenuToggle }) => {
  const user = useStoreState(state => state.user)
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
      <Grid
          size="60"
          speed="1.5"
          color="rgba(84, 176, 210, 1)" 
      />
      <div onClick={() => handleNotif()}>Click me</div>
      <div onClick={() => invertNotifToggle()} className="Notification-Icon">
        <IoIosNotifications className="BellIcon" size={30} style={{ color: 'white' }}/>
        
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
        <CgProfile size={30} style={{ color: 'white', marginLeft: "40px" }}/>
        <p>{user.username}</p>
      </div>
      
       
    </nav>
  )
}

export default NavBar