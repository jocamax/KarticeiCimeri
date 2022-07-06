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

function CreateOglas() {
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        bathrooms: '1',
        bedrooms: '1',
        location: '',
        parking: true,
        price: 0,
        pol: 'M',
        images: {},
        telefon: '',
        name: '',

    })
    // other items will be added eventually
    const {bathrooms, 
        bedrooms, 
        brojCimera, 
        location,
        parking,
        price,
        images,
        telefon,
        name,
        pol} = formData

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
    if(images.length > 5){
      setLoading(false)
      toast.error('Max 4 images')
      return
    }

    // Firebase image storage
    // https://firebase.google.com/docs/storage/web/upload-files

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }
    // this was copied from somewhere, I will add source if I find it
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Images not uploaded')
      return
    })
    
    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp()
    }

    delete formDataCopy.images
    const docRef = await addDoc(collection(db, 'oglasi'),
    formDataCopy)

    setLoading(false)
    toast.success('Oglas je postavljen')
    navigate(`/category/oglasic/${docRef.id}`)
    }


    const onMutate = (e) => {
        let boolean = null
        if(e.target.value === 'true'){
            boolean = true
        }
        
        if(e.target.value === 'false'){
            boolean = false
        }

        //fajlov
        if(e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                images: e.target.files
            }))
        }

        // tekstovi booleansi i brojevi
        if(!e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id] : boolean ?? e.target.value
            }))
        }
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
            {/* Ime */}
            <form onSubmit={onSubmit}>
                <label className='label'>Ime</label>
                <input 
                className='input inputText'
                type="text"
                id='name'
                value={name}
                onChange={onMutate}
                maxLength='30'
                minLength='2'
                required
                />
           
            <div>
                {/* Spavace sobe i kupatila */}
                <div>
                <label className='label'>Broj spavacih soba</label>
                <input 
                className='inputNumber'
                type="number"
                id='bedrooms'
                value={bedrooms}
                onChange={onMutate}
                min='1'
                max='12'
                required
                />
                </div>
                <div>
                <label className='label'>Broj kupatila</label>
                <input 
                className='inputNumber'
                type="number"
                id='bathrooms'
                value={bathrooms}
                onChange={onMutate}
                min='1'
                max='12'
                required
                />
                </div>
            </div>
            {/* Parking */}
            <div className=''>
            <label className='label'>Parking</label>
            <button
              className={parking ? 'parkingTrue' : 'parkingFalse'}
              type='button'
              id='parking'
              value={true}
              onClick={onMutate}
              min='1'
              max='50'
            >
              Da
            </button>
            <button
              className={
                !parking && parking !== null ? 'parkingTrue' : 'parkingFalse'
              }
              type='button'
              id='parking'
              value={false}
              onClick={onMutate}
            >
              Ne
            </button>
          </div>
          {/* Pol */}
          <div className=''>
                <label className='label'>Pol</label>
            <button
              className={pol ? 'parkingTrue' : 'parkingFalse'}
              type='button'
              id='pol'
              value={true}
              onClick={onMutate}
              min='1'
              max='50'
            >
              Ženski
            </button>
            <button
              className={
                !pol && pol !== null ? 'parkingTrue' : 'parkingFalse'
              }
              type='button'
              id='pol'
              value={false}
              onClick={onMutate}
            >
              Muški
            </button>
          </div>
          <label className='label'>Adresa</label>
          <textarea 
          className='inputText'
          type='text'
          id='location'
          value={location}
          onChange={onMutate}
          required
          />
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
              min='10'
              max='2000'
              required
            />
           <label className=''> € / Mesecno</label>
          </div>
          </div>
          {/* Slike */}
          <label className='label'>Slike</label>
          <p className='label'>
            Prva slika koju postavite ce da bude naslovna slika
          </p>
          <input
            className='inputText'
            type='file'
            id='images'
            onChange={onMutate}
            max='4'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <div>
          <button className='btn' type='submit'>Postavi Oglas</button>
          </div>

           </form>
        </main>
    </div>
  )
}

export default CreateOglas