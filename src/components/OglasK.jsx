import {Link} from 'react-router-dom'


function OglasK({oglas, id}) {
  return (
    <li className='oglasKarticeContainerLi'>
        <Link to={`/oglasi-kartice/${id}`}>
          <div className='oglasContainer'>
              <p>Prodaja kartica</p>
            <p>{oglas.price}</p>
            <p>{oglas.brojobroka}</p>
            <p>{oglas.telefon}</p>
          </div>
            
        </Link>
    </li>
  )
}

export default OglasK