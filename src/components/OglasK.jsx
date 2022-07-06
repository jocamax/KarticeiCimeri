import {FaPhone, FaTrashAlt} from 'react-icons/fa'



function OglasK({oglas, id, onDelete}) {
  return (
    <li className='oglasKarticeContainerLi'>
        <div>
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
          {onDelete && (
          <FaTrashAlt
          className='removeIcon'
          fill='red'
          cursor='pointer'
          onClick={() => onDelete(oglas.id, oglas.name)}
        />
        )}
      
        </div>

    </li>
  )
}

export default OglasK