import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <>
    <main>
      <div className="main-container">
        <Link to='/oglasi-kartice'>
        <div className="main-box">
        <img className='main-img' src="https://cdn-icons-png.flaticon.com/512/904/904816.png" alt="" />
        <p className='home-text-1 tx-large'>Kartice za Menzu</p>
        </div>
        </Link>
        <Link to='/oglasic'>
        <div className="main-box">
       <img className='main-img' src="https://cdn-icons-png.flaticon.com/512/578/578110.png" alt="" />
        <p className='home-text-2 tx-large'>Nadji Cimera</p>
        </div>
        </Link>
   
      </div>
    </main>

    </>
  )
}

export default Home