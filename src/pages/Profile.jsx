import {getAuth, updateProfile} from 'firebase/auth'
import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import {FaUserAlt} from 'react-icons/fa'
function Profile() {
  const auth = getAuth()

  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
const {name, email} = formData

const navigate = useNavigate()

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
      <button className='btn logout' type='button' onClick={onLogout}>Log Out</button>
    </div>

    <div>
      Moji Oglasi
    </div>
    
  </div>
  </div>
  )
}

export default Profile