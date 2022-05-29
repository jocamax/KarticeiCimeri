import React from 'react'
import loadingGif from "../assets/realSpinner.gif"


function Spinner() {
  return (
        <div className='spinner-div'>
            <img className='spinner' src={loadingGif} alt="" />
        </div>
     
        

  )
}

export default Spinner