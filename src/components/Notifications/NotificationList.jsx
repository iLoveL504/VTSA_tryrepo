import React from 'react'
import { useStoreState } from 'easy-peasy'
import Notification from './Notification'

const NotificationList = () => {
    const notifications = useStoreState(state => state.notifications )
    return (
        <ul>
            {notifications.map(n => 
                <Notification n={n} key={n.notification_id}/>
            )}
        </ul>
    )
}

export default NotificationList