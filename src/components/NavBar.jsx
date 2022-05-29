import {useNavigate, useLocation} from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate()
  return (
    <nav className="navBar">
        <h1 className='navLogo'>Kartice<span className='orangeWord'>&</span>Cimeri</h1>
        <ul className='navBarList'>
            <li className='navItem' onClick={()=> navigate('/')}>Home</li>
            <li className='navItem' onClick={()=> navigate('/oglasic')}>Oglasi</li>
            <li className='navItem' onClick={()=> navigate('/oglasi-kartice')}>Oglasi Kartice</li>
            <li className='navItem' onClick={()=> navigate('/profile')}>Profile</li>

        </ul>

    </nav>
  )
}

export default NavBar