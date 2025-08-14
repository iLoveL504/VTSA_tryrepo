import { useLocation } from 'react-router-dom'

const Dashboard = () => {
  const location = useLocation()
  console.log(location)
  return (
    <>
      <div className="Content Dashboard">
        <div className="left-panel">
          <div className="box">
            <h3 className="box-header">Ongoing Project/s:</h3>
            <img  alt="Project Chart"/>
          </div>
          <div className="box">
            <h3 className="box-header">Scheduled for maintenance</h3>
            <div className="card">
              <h4>Client 1</h4>
              <p>notes notes notes notes notes notes notes notes notes notes</p>
              <button>Button</button>
            </div>
          </div>
        </div>

        <div className="right-panel box">
          <h3 className="box-header">Messages</h3>
          <hr/>
          <p>No new messages.</p>
        </div>

        <button className="new-project-button">New Project+</button>
      </div>
    </>
  )
}

export default Dashboard