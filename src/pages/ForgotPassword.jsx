import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'


function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = e =>{
    setEmail(e.target.value)
  }

  const onSubmit =async (e) =>{
    e.preventDefault()

    try {
      const auth = getAuth()
      // firebase function for reseting password
      await sendPasswordResetEmail(auth, email)
      toast.success('Email sent')
      setEmail('')
      
    } catch (error) {
      toast.error('Neuspesno')
    }
  }

  return (
    <div>
      <p>Forgot password</p>
      <form onSubmit={onSubmit}>
        <input 
        type="email"
        value={email}
        id='email'
        placeholder='Enter Email'
        onChange={onChange}
        />
        <button type='submit'>Sent Reset Link</button>
        <Link to='/sign-in'>Sign In</Link>
      </form>
    </div>
  )
}

export default ForgotPassword