import { useState } from 'react'
import MenuBar from './components/MenuBar'
import NavBar from './components/NavBar'
import useToggle from './hooks/useToggle'
import Dashboard from './components/Dashboard'
import { useNavigate, Routes, Route } from 'react-router-dom';

function App() {
  const [menuToggle, invertMenuToggle] = useToggle()
  const navigate = useNavigate();

  return (
    <>
      <div>
        <NavBar invertMenuToggle={invertMenuToggle}/>
        <main>
          <div className={menuToggle ? '' : 'menuOn'}>
          </div>
            <MenuBar menuToggle={menuToggle} navigate={navigate}/>
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          
        </main>
      </div>
    </>
  )
}

export default App
