import React from 'react'
import {useEffect, useState} from 'react'
import {
  collection, 
  getDocs, 
  query, 
  orderBy,
  limit,
  }
   from 'firebase/firestore'
 import {db} from '../firebase.config'
 import {toast} from 'react-toastify'
 import OglasC from '../components/OglasC'
import Spinner from '../components/Spinner'


function OglasiCimer() {
  const [oglasi, setOglasi] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    const fetchOglasi = async ()=>{
      try {
        const oglasiRef = collection(db,'oglasi')
        // pravim query
        const q = query(
          oglasiRef,
          orderBy('timestamp', 'desc'), 
          limit(10)
          )
          // execute query
          const querySnap = await getDocs(q)
          const oglasi = []

          querySnap.forEach((doc)=>{
            return oglasi.push({
              id: doc.id,
              data: doc.data()
            })
          })
          

          setOglasi(oglasi)
          setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }

    }
    fetchOglasi()
  },[])

  return (
    <div>{loading?( <Spinner/> ): oglasi && oglasi.length > 0 ? (
      <>
      <main>
        <h1 className='oglasiH1'>Oglasi</h1>
        <ul className='oglasiContentGrid'>
          {oglasi.map((oglas) =>{
           return <OglasC 
           oglas={oglas.data} 
           id={oglas.id} 
           key={oglas.id}
           />
          })}
        </ul>
      </main>
      </> 
       ):( <p>Nema oglasa</p>
      
    )}
    </div>
  )
}

export default OglasiCimer