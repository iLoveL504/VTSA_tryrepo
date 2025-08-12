import useToggle from '../hooks/useToggle'
import { useAuth } from '../hooks/useAuth'
import MenuBar from '../components/MenuBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Layout = () => {
    const [menuToggle, invertMenuToggle] = useToggle()
    return (
     <div>
        <NavBar invertMenuToggle={invertMenuToggle}/>
        <main className='Main-Content'>
            <MenuBar className={menuToggle ? '' : 'menuOn'} menuToggle={menuToggle}/>          
            <section style={{ flex: 1 }}>
              <Outlet />
            </section>
          
        </main>
    </div>
  )
}

export default Layout