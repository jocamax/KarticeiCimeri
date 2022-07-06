import {getAuth, updateProfile} from 'firebase/auth'
import {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {
  updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import {FaAssistiveListeningSystems, FaUserAlt} from 'react-icons/fa'
import { async } from '@firebase/util'
import OglasC from '../components/OglasC'
import OglasK from '../components/OglasK'

function Profile() {
  const auth = getAuth()

  const [changeDetails, setChangeDetails] = useState(false)

  const [oglasi, setOglasi] = useState(null)

  const [oglasiKartice, setOglasiKartice] = useState(null)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
const {name, email} = formData

const navigate = useNavigate()

useEffect(()=>{
  const fetchUserOglasi = async() =>{
    const oglasiRef = collection(db, 'oglasi')
    const q = query(
      oglasiRef, 
      where('userRef', '==', auth.currentUser.uid), 
      orderBy('timestamp', 'desc'))
    
      const querySnap = await getDocs(q)

      let oglasi = []

      querySnap.forEach((doc)=>{
        return oglasi.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setOglasi(oglasi)
  }
  const fetchUserOglasiKartice = async() =>{
    const oglasiRef = collection(db, 'oglasi-kartice')
    const q = query(
      oglasiRef, 
      where('userRef', '==', auth.currentUser.uid), 
      orderBy('timestamp', 'desc'))
    
      const querySnap = await getDocs(q)

      let oglasiKartice = []

      querySnap.forEach((doc)=>{
        return oglasiKartice.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setOglasiKartice(oglasiKartice)
  }
  fetchUserOglasiKartice()
  fetchUserOglasi()
}, [auth.currentUser.uid])

const onDelete= async (oglasId) =>{
  if(window.confirm('Da li sigurno zelis da obrises ovaj oglas?')) {
    await deleteDoc(doc(db, 'oglasi-kartice', oglasId))
  }
  const updateOglas = oglasiKartice.filter((oglas)=>oglas.id !== oglasId)
  setOglasiKartice(updateOglas)
  toast.success('Uspesno ste obrisali oglas')

}

const onDeleteCimer= async (oglasId) =>{
  if(window.confirm('Da li sigurno zelis da obrises ovaj oglas?')) {
    await deleteDoc(doc(db, 'oglasi', oglasId))
  }
  const updateOglas = oglasi.filter((oglas)=>oglas.id !== oglasId)
  setOglasi(updateOglas)
  toast.success('Uspesno ste obrisali oglas')

}

const onLogout = ()=>{
  auth.signOut()
  navigate('/')

}

const onSubmit = async () =>{
  try {
    if(auth.currentUser.displayName !== name){
    
      await updateProfile(auth.currentUser, {
        displayName: name
      })
      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, {
        name
      })
    }
  } catch (error) {
    toast.error('Neuspesno azuriranje detalja')
  }
}

const onChange = (e) =>{
  setFormData((prevState)=>({
    ...prevState,
    [e.target.id] : e.target.value
  }))
}

  // return user? <h1>{user.displayName}</h1>: 'Not Logged In'
  return(
    <div className="containerProfile">
    <div className='profileContainer'>
    <header>
    <h1 className='profileHeader'><FaUserAlt/> Moj profil</h1>
    </header>
    <div className='profileDeatails'>
      <h3 className='profileDetailsHeader'>Detalji</h3>
      <p 
      className='btn saveBtn' 
      onClick={()=>{
        if(changeDetails){
          onSubmit()
        }
        setChangeDetails((prevState) => !prevState)
      }}>{changeDetails ? 'Sacuvaj promene' : 'Promeni detalje'}</p>
    </div>
    <div className='profileDetails'>
      <p className='profileEmail'>Ime:</p>
      <form className='profileForm'>
        <input 
        className='profileInput'
        type="text" 
        id='name'
        disabled={!changeDetails} 
        value={name}
        onChange={onChange}
        />
      </form>
      <p className='profileEmail'>Email</p>
      <p className='profileEmail'>{email}</p>
    </div>
    <div className='profileButtons'>
      <Link to='/napravi-oglas'>
      <button className='btn'>Nadji cimera</button>
      </Link>
      <Link to='/napravi-oglas-kartica'>
        <button className='btn'>Oglasi Karticu</button>
      </Link>
      <button className='btn logout' type='button' onClick={onLogout}>Log Out</button>
    </div>

    <div className='moji-oglasi-container'>
      <h2>Moji Oglasi</h2>
      <div className='moji-oglasi'>
      {oglasiKartice?.length > 0 && (
          <>
          <ul className='oglasi-lista'>
            {oglasiKartice.map((oglas)=>(
              <OglasK
              key={oglas.id} 
              oglas={oglas.data} 
              id={oglas.id}
              onDelete={()=>onDelete(oglas.id)}
              />
            )

            )}
          </ul>
          </>
        )}
        {oglasi?.length > 0 && (
          <>
          <ul className='oglasi-lista'>
            {oglasi.map((oglas)=>(
              <OglasC 
              key={oglas.id} 
              oglas={oglas.data} 
              id={oglas.id}
              onDelete={()=> onDeleteCimer(oglas.id)}
              />
            )

            )}
          </ul>
          </>
        )}
      </div>
    </div>
    
  </div>
  </div>
  )
}

export default Profile