import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  // State za ono sto se unosi u formu i state za sakrivanje/prikazivanje sifre
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const {email, password, name} = formData

  const navigate = useNavigate()

  const onChange = (e) =>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
      
    }))

  }

  // https://firebase.google.com/docs/auth/web/start
  // I use async await because I like it more :D 
  const onSubmit = async (e) =>{
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth,email,password)

      const user = userCredential.user
      // https://firebase.google.com/docs/auth/web/manage-users
      updateProfile(auth.currentUser, {
        displayName: name
       })
       const formDataDuplicate = {...formData}
       delete formDataDuplicate.password //brisem sifru da se ne bi prikazala u bazi
       formDataDuplicate.timestamp = serverTimestamp() 

      await setDoc(doc(db, 'users', user.uid), formDataDuplicate)

      navigate('/')
    } catch (error) {
      toast.error('Greska u registraciji')
    }

  }

  return (
    <div className='signInPage'>
    <h1 className='signInHeading'>Sign Up page</h1>
    <form onSubmit={onSubmit} className='signInForm'>
    <div>
      <label>Name</label>
      <input 
        className='textInput'
        type="text" 
        placeholder='Name'
        id='name'
        value={name}
        onChange={onChange}
/>
      </div>
      <div>
      <label >Email</label>
      <input 
      className='textInput'
      type="email" 
      placeholder='Email'
      id='email'
      value={email}
      onChange={onChange}
      />
      </div>

    <div className='passwordField'>
      <label>Password</label>
      <input 
      className='textInput'
      type={showPassword? 'text' : 'password'} 
      placeholder='Password'
      id='password' 
      value={password}
      onChange={onChange}
      />
      <p className='passwordChangeBtn' onClick={()=>setShowPassword((prevState)=> !prevState)}>{showPassword ? 'hide' : 'show'}</p>
      </div>

      <button className='signInBtn tx-medium'>Sign Up</button>
    </form>
    <hr className='hr'/>
    <div className='signinBottomDiv'>
      <Link className='signInLink' to='/sign-in'>Sign In Instead</Link>
      <Link className='signInLink' to='/forgot-password'>Forgot Password</Link>
    </div>

  </div>
  )
}

export default SignUp
