import React from 'react'
import TestChart from './Tests/TestChart'
const NotLoggedIn = () => {
  return (
    <div className='Content NotLoggedIn'>
        you are not logged in
        <div>Kindly log in <a href="" onClick={() => {navigate('/login')}}>here</a></div>
        <TestChart />
    </div>
  )
}

export default NotLoggedIn