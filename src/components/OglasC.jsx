import {Link} from 'react-router-dom'
import {FaPhone} from 'react-icons/fa'
import {FaMapMarkerAlt, FaTrashAlt} from 'react-icons/fa'
import {FaBath} from 'react-icons/fa'
import {FaBed} from 'react-icons/fa'


function OglasC({oglas, id, onDelete}) {
  return (
    <li className='oglasContainer'>
      <div className='oglasContainerLi'>
        <Link to={`/oglasic/${id}`}>
          <div className='oglasContainer'>
            <div className='oglasImgContainer'>
            <img className='oglasImg' src={oglas.imgUrls[0]} alt={oglas.name} />
            </div>

           <div className='oglasMainContent'>
             <div className='mainContentFlex1'>
               <div className='nameAndPhone'>
               <p className='oglasName aTagRemove'>{oglas.name}</p>
               <p className='brTelefona'><FaPhone/> {oglas.telefon}</p>
               </div>
         
              <p className='oglasLocation'><FaMapMarkerAlt/> {oglas.location}</p>
              <p className='oglasCena'>Cena: €{oglas.price}</p>
             </div>
              <div className="mainContentFlex2">
                <p><FaBed/> {oglas.bedrooms} {oglas.bedrooms > 1 ? 'Spavaće sobe': 'Spavaća soba'}</p>
                <p><FaBath/> {oglas.bathrooms} {oglas.bathrooms > 1 ? 'Kupatila': 'Kupatilo'}</p>
              </div>
           </div>
          </div>
            
        </Link>
        </div>
  
        {onDelete && (
          <FaTrashAlt
          className='removeIconC'
          fill='red'
          cursor='pointer'
          onClick={() => onDelete(oglas.id, oglas.name)}
        />
        )}

    </li>
  )
}

export default OglasC