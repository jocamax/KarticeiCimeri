import {Link} from 'react-router-dom'
import {FaPhone} from 'react-icons/fa'


function OglasK({oglas, id}) {
  return (
    <li className='oglasKarticeContainerLi'>
        <Link to={`/oglasi-kartice/${id}`}>
          <div className='oglasKContainer'>
            <div className='box-1'>
            <p className='tx-big'>Prodaja kartica</p>
            <p className='tx-big oglasPrice'>Cena: €{oglas.price}</p>
            </div>
            <div className='box-2'>
            <p>Broj obroka: <span className='karticaSpan'>{oglas.brojobroka}</span></p>
            <p>Broj telefona <FaPhone/><span className='karticaSpan'>{oglas.telefon}</span></p>
            </div>

          </div>
            
        </Link>
    </li>
  )
}

export default OglasK