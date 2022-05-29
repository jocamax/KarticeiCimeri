// import React from 'react'
// import {useEffect, useState} from 'react'
// import {
//   collection, 
//   getDocs, 
//   query, 
//   orderBy,
//   limit,
//   }
//    from 'firebase/firestore'
//  import {db} from '../firebase.config'
//  import {toast} from 'react-toastify'
//  import OglasK from '../components/OglasK'
// import Spinner from '../components/Spinner'


// function OglasiKartice() {
//   const [oglasiKartice, setOglasiKartice] = useState(null)
//   const [loading, setLoading] = useState(true)


//   useEffect(()=>{
//     const fetchOglasiKartice = async ()=>{
//       try {
//         const oglasiKRef = collection(db,'oglasi-kartice')
//         // pravim query
//         const q = query(
//           oglasiKRef,
//           orderBy('timestamp', 'desc'), 
//           limit(10)
//           )
//           // execute query
//           const querySnap = await getDocs(q)
//           const oglasiKartice = []

//           querySnap.forEach((doc)=>{
//             return oglasiKartice.push({
//               id: doc.id,
//               data: doc.data()
//             })
//           })
          

//           setOglasiKartice(oglasiKartice)
//           setLoading(false)
//       } catch (error) {
//         toast.error('Could not fetch')
//       }

//     }
//     fetchOglasiKartice()
//   },[])

//   return (
//     <div>{loading?( <Spinner/> ): oglasiKartice && oglasiKartice.length > 0 ? (
//       <>
//       <main>
//         <ul className='oglasiContentGrid'>
//           {oglasiKartice.map((oglasK) =>{
//            return <OglasK 
//            oglasK={oglasK.data} 
//            id={oglasK.id} 
//            key={oglasK.id}
//            />
//           })}
//         </ul>
//       </main>
//       </> 
//        ):( <p>Nema oglasa</p>
      
//     )}
//     </div>
//   )
// }

// export default OglasiKartice
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
 import OglasK from '../components/OglasK'
import Spinner from '../components/Spinner'


function OglasiKartice() {
  const [oglasi, setOglasi] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    const fetchOglasi = async ()=>{
      try {
        const oglasiRef = collection(db,'oglasi-kartice')
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
        toast.error('Could not fetch')
        console.log(error);
      }

    }
    fetchOglasi()
  },[])

  return (
    <div>{loading?( <Spinner/> ): oglasi && oglasi.length > 0 ? (
      <>
      <main>
        <ul className='oglasiKarticeGrid'>
          {oglasi.map((oglas) =>{
           return <OglasK
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

export default OglasiKartice