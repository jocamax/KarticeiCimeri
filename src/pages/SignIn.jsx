import {useState} from 'react'
import {toast} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  // State za ono sto se unosi u formu i state za sakrivanje/prikazivanje sifre
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) =>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
      
    }))
  }

  const onSubmit = async(e)=>{
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredidentials = await signInWithEmailAndPassword(auth, email, password)

      if(userCredidentials.user){
        navigate('/')
      }
      
    } catch (error) {
      toast.error('Pogresili ste email ili sifru')
    }
  }



  return (
    <div className='signInPage'>
      <h1 className='signInHeading'>Sign In page</h1>
      <form onSubmit={onSubmit} className='signInForm'>
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

        <button className='signInBtn tx-medium'>Sign In</button>
      </form>
      <hr className='hr'/>
      <div className='signinBottomDiv'>
        <Link className='signInLink' to='/sign-up'>Sign Up Instead</Link>
        <Link className='signInLink' to='/forgot-password'>Forgot Password</Link>
      </div>

    </div>
  )
}

export default SignIn