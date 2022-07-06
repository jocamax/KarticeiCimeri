import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";
import {db} from '../firebase.config'
import { toast } from 'react-toastify';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import Spinner from '../components/Spinner';

//spiner

function CreateKartica() {
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        brojobroka: 0,
        price: 0,
        telefon: '',
        
    })
    // destructuring formData
    const {
        brojobroka,
        price,
        telefon,
    } = formData

    const auth =getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(()=>{
        if(isMounted){
            onAuthStateChanged(auth, (user) => {
                if(user){
                    setFormData({...formData, userRef: user.uid})
                } else{
                    navigate('/sign-in')
                }
            })
        }


        setLoading(false)

        return ()=>{
            isMounted.current = false
        }
 // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isMounted] )

    const onSubmit = async (e)=>{
    e.preventDefault()
      setLoading(true)


    
    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp()
    }
    // add to firebase storage in 'oglasi-kartice' collection
    const docRef = await addDoc(collection(db, 'oglasi-kartice'),
    formDataCopy)

    setLoading(false)
    toast.success('Oglas je postavljen')
    navigate(`/oglasi-kartice`)
    }


    const onMutate = (e) => {
        // tekstovi booleansi i brojevi
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id] : e.target.value
            }))
        
    }

    if(loading){
       return <Spinner/>
    }
  return (
    <div className='napraviOglasContainer'>
        <header>
            <h1 className='napraviOglasHeader'>Napravi Oglas</h1>
        </header>
        <main className='formContent'>
           <form onSubmit={onSubmit}>
            {/* Broj Obroka */}
           <div>
          <label className='label'>Broj Obroka</label>
          <div className=''>
            <input
              className='inputNumber inputPrice'
              type='number'
              id='brojobroka'
              value={brojobroka}
              onChange={onMutate}
              min='1'
              max='90'
              required
            />
           <label className=''> FOOD ICON</label>
          </div>
          </div>
         
          {/* Cena */}
          <div>
          <label className='label'>Cena</label>
          <div className=''>
            <input
              className='inputNumber inputPrice'
              type='number'
              id='price'
              value={price}
              onChange={onMutate}
              min='1'
              max='200'
              required
            />
           <label className=''> €</label>
          </div>
          </div>

           {/* Broj Telefona */}
           <div>
          <label className='label'>Broj Telefona</label>
          <div className=''>
            <input
              className='inputText'
              type='string'
              id='telefon'
              value={telefon}
              onChange={onMutate}
              required
            />
           <label className=''> </label>
          </div>
          </div>
          <div>
          <button className='btn' type='submit'>Postavi Oglas</button>
          </div>
           </form>
        </main>
    </div>
  )
}

export default CreateKartica