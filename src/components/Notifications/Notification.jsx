import React from 'react'

const Notification = ({n}) => {
  return (
     <li className="notification-item">
      <div className="notification-content">
        <h4 className="notification-title">{n.subject}</h4>
        <p className="notification-message">{n.body}</p>
        <div className="notification-meta">
          <span className="notification-time">Today, 10:45 AM</span>
          <span className="notification-status unread"></span>
        </div>
      </div>
    </li>
  )
}

export default Notification